let night_Img = 'https://cdn.pixabay.com/photo/2022/04/12/23/36/night-7129130_1280.jpg' // night image
let day_img = 'https://media.istockphoto.com/id/1381637603/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=w64j3fW8C96CfYo3kbi386rs_sHH_6BGe8lAAAFS-y4='
let evening_img = 'https://c4.wallpaperflare.com/wallpaper/265/962/422/hills-green-summer-light-wallpaper-preview.jpg'

let id = crypto.randomUUID();

// database
let todos = [];
// localStorage.setItem("todos", JSON.stringify(todos))
let dallyPlaning = {};
let dallyGoals = [];
// localStorage.setItem("dallyGoals", JSON.stringify(dallyGoals))

const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const greetingElement = document.getElementById("greeting");
const main = document.querySelector("main")
const weatherElement = document.querySelector(".weatherElement")
const topTemp = document.querySelector("#temperature")
const topweather = document.querySelector("#weather-status")
const topico = document.querySelector(".weather-icon")
const curent_loaction = document.querySelector("#location")
const nav_container = document.querySelector(".nav-container")
const overlay = document.querySelector(".overlay")
const todo_container = document.querySelector(".todo-container")



// abdur sir yaha par colock updae function leak ha 
function updateClock() {
    const now = new Date();




    let rawHours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");


    const ampm = rawHours >= 12 ? "PM" : "AM";


    let hours = rawHours % 12;
    hours = hours ? hours : 12;

    hours = String(hours).padStart(2, "0");


    timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;



    const dateOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
    dateElement.textContent = now.toLocaleDateString("en-US", dateOptions);

    const customMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Oct", "Nov", "Dec"];

    const month = customMonths[now.getMonth()];
    const day = now.getDate();
    let dallyPlaningTiming = document.querySelector("#dayPlaningDate")
    dallyPlaningTiming.innerHTML = `<span>Today</span>
                        <strong> ${month} ${day} </strong>`




    const currentHour = now.getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning ☀️";
        main.style.backgroundImage = `url(${day_img})`;
        
    } else if (currentHour < 18) {
        greeting = "Good Afternoon 🌤️";
        main.style.backgroundImage = `url(${evening_img})`;
    } else {
        greeting = "Good Evening 🌙";
        main.style.backgroundImage = `url(${night_Img})`;
    }
    main.style.backgroundPosition = "center";
    main.style.backgroundSize = "cover";
    main.style.backgroundRepeat = "no-repeat";

    greetingElement.textContent = greeting;
}

//  i need to further add other feature here like wind speed etc latter
async function updateWeather(lat, lon) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=auto`);


        if (!response.ok) throw new Error("Weather data fetch failed");

        const data = await response.json();
        console.log(data)
        const temp = Math.round(data.current.temperature_2m);
        const unit = data.current_units.temperature_2m;
        const code = data.current.weather_code;
        const locate = data.timezone;
        const windSpeed = data.current.wind_speed_10m;
        const humidity = data.current.relative_humidity_2m;


        let condition = "Clear";
        if (code >= 1 && code <= 3) condition = "Partly Cloudy ⛅";
        else if (code >= 45 && code <= 48) condition = "Foggy 🌫️";
        else if (code >= 51 && code <= 67) condition = "Raining 🌧️";
        else if (code >= 71 && code <= 77) condition = "Snowing 🌨️";
        else if (code >= 80 && code <= 82) condition = "Showers 🌦️";
        else if (code >= 95) condition = "Thunderstorm ⛈️";
        else condition = "Clear Skies ☀️";

        weatherElement.textContent = `${temp}${unit} • ${condition}`;
        topTemp.textContent = `${temp}${unit}`
        let weather_ico = condition.split(" ")[2]
        let about_weather = condition.split(" ").slice(0, 2).join(" ");

        topweather.textContent = `${about_weather}`
        topico.textContent = `${weather_ico}`
        curent_loaction.textContent = `${locate}`
        
        let humidityhtml = document.querySelector("#humidity")
        let windhtml = document.querySelector("#wind")
        humidityhtml.textContent = `${windSpeed} km/h`
        windhtml.textContent = `${humidity} %`

    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherElement.textContent = "Weather unavailable";
    }
}


function initLocationAndWeather() {
    if ("geolocation" in navigator) {
        weatherElement.textContent = "Detecting location...";

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;



                updateWeather(lat, lon);

                setInterval(() => updateWeather(lat, lon), 900000);
            },
            (error) => {
                console.error("Error getting location:", error);
                weatherElement.textContent = "Location access denied";

                const defaultLat = 51.5074;
                const defaultLon = -0.1278;
                updateWeather(defaultLat, defaultLon);
                setInterval(() => updateWeather(defaultLat, defaultLon), 900000);
            }
        );
    } else {
        weatherElement.textContent = "Geolocation not supported";
    }
}


function swithc_navLink_tab() {
    nav_container.addEventListener("click", (e) => {

        // const clickedLink = e.target.closest("a");


        // if (!clickedLink) return;


        const allTabs = document.querySelectorAll(".tab");

        allTabs.forEach((tab) => {
            tab.classList.add("make_thing_hide");
        });


        if (e.target.closest("#todo")) {

            console.log("open todo");
            overlay.classList.remove("make_thing_hide")
            document.querySelector(".todo-container")
                .classList.remove("make_thing_hide");

        } else if (e.target.closest("#dally_planing")) {

            console.log("open daily planning");
            overlay.classList.remove("make_thing_hide")
            document.querySelector(".day-planing")
                .classList.remove("make_thing_hide");

        } else if (e.target.closest("#motivation")) {

            console.log("Open motivational quote");
            overlay.classList.remove("make_thing_hide")
            document.querySelector(".motivational-qutes")
                .classList.remove("make_thing_hide");

        } else if (e.target.closest("#stopwatch")) {

            console.log("open stopwatch");
            overlay.classList.remove("make_thing_hide")
            document.querySelector(".stopwatch")
                .classList.remove("make_thing_hide");

        } else if (e.target.closest("#dally_goals")) {

            console.log("Open daily goals");

            overlay.classList.remove("make_thing_hide")
            document.querySelector(".dally-goals")
                .classList.remove("make_thing_hide");

        }
    });
}


function closeTabs() {

    const closeButtons = document.querySelectorAll(".close_btn");

    closeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const currentTab = button.closest(".tab");
            overlay.classList.add("make_thing_hide")
            currentTab.classList.add("make_thing_hide");

        });

    });

}


// render Todos 
function renderTodos() {
    let todos_Counts = document.querySelector("#no_of_todos")
    let todo_filters = document.querySelector(".todo-filters")
    let allTodosList = document.querySelector("#All")
    let activeTodosList = document.querySelector("#active")
    let completedTodosList = document.querySelector("#completed")
    let todo_list = document.querySelector(".todo-list")
    let filterIdArr = [allTodosList, activeTodosList, completedTodosList]
    todo_list.innerHTML = ""

    let lsd = localStorage.getItem("todos")
    todos = JSON.parse(lsd) || []
    todos_Counts.textContent = `${todos.length} Tasks`
    // first render all todos

    allTodosList.classList.add("active")
    todos.map((todo) => (
        todo_list.innerHTML += `<div data-todo-id='${todo.id}' class="todo-item">
                        <div class="todo-info">
                            <input ${todo.isComplete && 'checked'} onchange="makrTodoAsCompleted(this, '${todo.id}')"  type="checkbox" />
                            <span>${todo.myTodo}</span>
                        </div>

                        <button class="delete-btn" onClick="deleteTodo('${todo.id}')" >Delete</button>
                    </div>`
    ))

    todo_filters.addEventListener("click", (e) => {
        todo_list.innerHTML = ""
        filterIdArr.forEach(elem => {
            elem.classList.remove("active")
        });
        if (e.target.id == 'All') {

            allTodosList.classList.add("active")
            todos.map((todo) => (
                todo_list.innerHTML += `<div data-todo-id='${todo.id}' class="todo-item">
                        <div class="todo-info">
                            <input ${todo.isComplete && 'checked'} onchange="makrTodoAsCompleted(this, '${todo.id}')" type="checkbox" />
                            <span>${todo.myTodo}</span>
                        </div>

                        <button onClick="deleteTodo('${todo.id}')" class="delete-btn">Delete</button>
                    </div>`
            ))
        } else if (e.target.id == "active") {

            activeTodosList.classList.add("active")
            todos.map((todo) => {
                if (todo.isComplete == false) {
                    return todo_list.innerHTML += `<div data-todo-id='${todo.id}' class="todo-item">
                        <div class="todo-info">
                            <input ${todo.isComplete && 'checked'} onchange="makrTodoAsCompleted(this, '${todo.id}')"  type="checkbox" />
                            <span>${todo.myTodo}</span>
                        </div>

                        <button onClick="deleteTodo('${todo.id}')" class="delete-btn">Delete</button>
                    </div>`
                }
            })

        } else {

            completedTodosList.classList.add("active")
            todos.map((todo) => {
                if (todo.isComplete == true) {
                    return todo_list.innerHTML += `<div data-todo-id='${todo.id}' class="todo-item">
                        <div class="todo-info">
                            <input ${todo.isComplete && 'checked'}  onchange="makrTodoAsCompleted(this, '${todo.id}')" type="checkbox" />
                            <span>${todo.myTodo}</span>
                        </div>

                        <button onClick="deleteTodo('${todo.id}')" class="delete-btn">Delete</button>
                    </div>`
                }
            })
        }

    })
}

function makrTodoAsCompleted(e, id) {
    console.log(id)
    console.log(e.checked)
    let updatedTodoArr = [];
    if (e.checked) {
        updatedTodoArr = todos.map((todo) => {
            if (todo.id == id) {
                return {
                    ...todo,
                    isComplete: true
                }
            } else {
                return todo;
            }
        })
    } else {
        updatedTodoArr = todos.map((todo) => {
            if (todo.id == id) {
                return {
                    ...todo,
                    isComplete: false
                }
            } else {
                return todo
            }
        })
    }
    localStorage.setItem("todos", JSON.stringify(updatedTodoArr))
    renderTodos()

}

// Add task 
function addTodos() {
    let todo_form = document.querySelector('.todo-form');

    if (!todo_form) return;

    todo_form.addEventListener("submit", (e) => {
        e.preventDefault();
        let formdata = new FormData(e.target);
        let todo_title = formdata.get('todo')
        let my_todo = {
            id: id,
            myTodo: todo_title,
            isComplete: false
        }
        todos.push(my_todo);
        localStorage.setItem("todos", JSON.stringify(todos))
        renderTodos()
        id = crypto.randomUUID()
        todo_form.reset()

    });
}

// Delete Todo

function deleteTodo(id) {
    let updatedTodoArr = todos.filter(todo => todo.id != id)
    localStorage.setItem("todos", JSON.stringify(updatedTodoArr))
    renderTodos()
}


function dayPlaning() {
    const timelineInputs = document.querySelectorAll(".timeline input");
    dallyPlaning = JSON.parse(
        localStorage.getItem("dayPlaning")
    ) || {};
    timelineInputs.forEach((input, idx) => {
        input.value = dallyPlaning[idx] || "";
    });

    timelineInputs.forEach((input, idx) => {
        input.addEventListener("input", (e) => {
            dallyPlaning[idx] = e.target.value;
            localStorage.setItem("dayPlaning", JSON.stringify(dallyPlaning))
        })
    })

}


async function getQuote() {
    let quote = document.querySelector("#quote")
    let author = document.querySelector("#author")

    try {
        quote.textContent = "Pleas Wait..."
        author.textContent = "Pleas Wait..."
        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );
        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }

        const data = await response.json();


        quote.textContent = `${data.quote}`
        author.textContent = `-${data.author}`

    } catch (error) {
        console.error(error);
        quote.textContent = "Bahi api call ma issue ha i thing Pleas see the getQute() function and add correct api"
        author.textContent = "OOPs"
    }
}


function stopwatchFunctionalaties() {
    let timerInterval = null;
    let totalSeconds = 25 * 60;
    let isRunning = false;

    const display = document.querySelector(".stopwatch-display");
    const startBtn = document.querySelector(".start-btn");
    const pauseBtn = document.querySelector(".pause-btn");
    const resetBtn = document.querySelector(".reset-btn");

    function updateDisplay() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        display.textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer() {
        if (isRunning) return;

        isRunning = true;
        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                alert("Work Session complete!");
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        totalSeconds = 25 * 60;
        updateDisplay();
    }

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);

    updateDisplay();
}


function renderDallyGoals() {
    let totalGoals = document.querySelector("#dallyGoalCount")
    let goals_list = document.querySelector(".goals-list")
    goals_list.innerHTML = "";
    dallyGoals = JSON.parse(localStorage.getItem("dallyGoals")) || []



    totalGoals.textContent = `${dallyGoals.length} Goals`
    dallyGoals.map((goal) => (
        goals_list.innerHTML += `<div id="id-${goal.id}" class="goal-card">

                        <div class="goal-content">

                            <h3>${goal.title}</h3>

                            <p>
                                ${goal.description}
                            </p>

                        </div>

                        <button onclick="deleteGoal('${goal.id}')" class="delete-goal">
                            Delete
                        </button>

                    </div>`
    ))
}


function addDallyGoals() {
    let goal_form = document.querySelector(".goal-form")
    goal_form.addEventListener("submit", (e) => {
        e.preventDefault();
        let formdata = new FormData(e.target);
        let goal_title = formdata.get('gtitle')
        let goal_desc = formdata.get("gdesc")

        let mygoal = {
            id: id,
            title: goal_title,
            description: goal_desc
        }

        dallyGoals.push(mygoal)

        localStorage.setItem("dallyGoals", JSON.stringify(dallyGoals))
        renderDallyGoals()
        goal_form.reset()
        id = crypto.randomUUID()
    })

}


function deleteGoal(id) {
    console.log(id)
    let newGoalsarr = dallyGoals.filter(goal => goal.id !== id)
    localStorage.setItem("dallyGoals", JSON.stringify(newGoalsarr))
    renderDallyGoals()
}

addDallyGoals()
setInterval(updateClock, 1000);
updateClock();
initLocationAndWeather();
swithc_navLink_tab()
closeTabs()
renderTodos()
addTodos()
dayPlaning()
getQuote();
stopwatchFunctionalaties()
renderDallyGoals()