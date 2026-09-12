let uniqueId;
let add_todo_overlay = document.querySelector(".add_todo_overlay")
let add_todo_form = document.querySelector(".add_todo_form")
let visibls_todo_btn = document.querySelector("#make_todo_form_visible")
let theme;
let todos_Array;
let c_todos;
let editingTodoId = null;
let sidebar = document.querySelector("#sidebar")
let open_sidebar_btn = document.querySelector("#open_sidebar_btn")
let close_sidebar_btn = document.querySelector("#close_sidebar_btn")
let font;


function updateTheme() {
    
    theme = localStorage.getItem("theme")
    let light_theme_button = document.querySelector("#light_theme_btn")
    let dark_theme_button = document.querySelector("#dark_theme_btn")
    dark_theme_button.classList.remove("active")
    light_theme_button.classList.remove("active")
    if (!theme) {
        console.log("update theme function first if condition")
        theme = 'light'
        light_theme_button.classList.add("active")
        localStorage.setItem("theme", "light")
    } else if (theme == 'light') {
        document.documentElement.classList.remove("dark");
        light_theme_button.classList.add("active")
    } else {
        document.documentElement.classList.add("dark");
        dark_theme_button.classList.add("active")


    }
}
function updateFontStyle(){
    let main = document.querySelector("main")
    font = localStorage.getItem("font")
    if (!font) {
        font = 'sans-serif'
        localStorage.setItem("font", font)
    }
    let font_buttons = document.querySelectorAll(".font_option")
    font_buttons.forEach(button => {
        button.dataset.font == font ? button.classList.add("active") : button.classList.remove("active")
    });
    
    main.style.fontFamily = font
}

function initiate_Todos() {
    let lsd = localStorage.getItem("todos")
    let todos = JSON.parse(lsd) || []
    todos_Array = [...todos];
    show_todos()
}

initiate_Todos()

function get_number_of_c_todos() {

    let completed_todo_arr = todos_Array.filter(todo => todo.completed == true)
    console.log(completed_todo_arr)
    let completed_todos = completed_todo_arr.length
    localStorage.setItem("completed_todos", JSON.stringify(completed_todos))

}


function update_c_todos() {
    let completed_todos_lsd = localStorage.getItem("completed_todos")
    c_todos = JSON.parse(completed_todos_lsd)

}


function showTotal_completed() {
    let total_todos = todos_Array.length;
    let show_todo_html = document.querySelector("#total_tasks")
    let show_completed_todo_html = document.querySelector("#completed_tasks")
    show_todo_html.innerText = total_todos;
    show_completed_todo_html.innerText = c_todos || 0;
}


function show_todos() {

    let card_container = document.querySelector(".card_container")
    card_container.innerHTML = ""
    todos_Array.forEach(todo => {
        card_container.innerHTML += `<div class="task-card">

                            <div class="task-top">
                                <span class="task-category">${todo.category}</span>

                                <div class="task-actions">
                                    <button id="editTodo_btn" class="edit-btn" onClick="showEditTodoForm('${todo.id}')">✏️</button>
                                    <button onclick="delete_todo('${todo.id}')" class="delete-btn">🗑️</button>
                                </div>
                            </div>

                            <h3 class="task-title ${todo.completed && "completed"}">${todo.title}</h3>

                            <p class="task-description ${todo.completed && "completed"}">
                                ${todo.description}
                            </p>

                            <div class="task-bottom">

                                <span class="due-date">
                                    📅 ${todo.dueDate}
                                </span>

                                <button onclick="mark_task_complete('${todo.id}')" class="complete-btn ${todo.completed && "dasible_btn"}">
                                    ✓ Mark Complete
                                </button>

                            </div>

                        </div>`
    });
}



function logoHoverAnimation() {
    // logo text animation 
    // wraped each char in span
    let logo_txt = document.querySelector(".logo-text")
    logo_txt.innerHTML = logo_txt.textContent
        .split('')
        .map((char, idx) => char === ' ' ? '<span class="space">&nbsp;</span>' : `<span id="${idx}" class="logo-span"> ${char}</span>`)
        .join('');

    // Adding eventlistener on span

    // Here i used event delegations i attached the event listener with the logo txt 
    // using  event bubbling feature i ifnd the hover oneach spane

    logo_txt.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('logo-span'))
            event.target.style.transform = 'translateY(-6px) scale(1.15)'; {
            event.target.style.transition = 'transform 0.2s ease-out';
            // event.target.style.display = 'inline-block'; 
        }
    });


    logo_txt.addEventListener('mouseout', (event) => {
        if (event.target.classList.contains('logo-span')) {
            event.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}


// sidebar tab activation functionalities
function actvate_tab(tab_name) {
    let other_tab = document.querySelectorAll(".side_tab")
    console.log(other_tab)
    let targetNode = Array.from(other_tab).find(node => node.classList.contains("active"))
    targetNode.classList.remove("active")
    let current_activated_tabe = document.querySelector(`#${tab_name}`)
    current_activated_tabe.classList.add("active")
    closeSidebar()
    // getall task container
    let home_task_container = document.querySelector(".home_task_container")
    let dashboard_container = document.querySelector(".dashboard_container")
    let setting_container = document.querySelector(".settings_container")

    // frst make them all hide
    home_task_container.classList.add("make_thing_hide")
    dashboard_container.classList.add("make_thing_hide")
    setting_container.classList.add("make_thing_hide")
    // make navebar button hide
    visibls_todo_btn.classList.add("make_thing_hide")

    if (current_activated_tabe.getAttribute("id") == "home") {
        console.log("Home tab are active")
        home_task_container.classList.remove("make_thing_hide")
        visibls_todo_btn.classList.remove("make_thing_hide")



    } else if (current_activated_tabe.getAttribute("id") == "dashboard") {
        console.log("dashboard tab are active")
        dashboard_container.classList.remove("make_thing_hide")
        showTotal_completed()
        update_c_todos()

    } else {
        console.log("setting tab are active")
        setting_container.classList.remove("make_thing_hide")
    }

}

function openSidebar() {
    sidebar.classList.add("sidebar_visible")
    open_sidebar_btn.classList.add("sidebar_trigger_hidden")
    open_sidebar_btn.setAttribute("aria-expanded", "true")
}

function closeSidebar() {
    sidebar.classList.remove("sidebar_visible")
    open_sidebar_btn.classList.remove("sidebar_trigger_hidden")
    open_sidebar_btn.setAttribute("aria-expanded", "false")
}

open_sidebar_btn.addEventListener("click", openSidebar)
close_sidebar_btn.addEventListener("click", closeSidebar)

// make todo form vidible
function showAddTodForm() {


    visibls_todo_btn.addEventListener("click", () => {
        editingTodoId = null;
        add_todo_overlay.classList.remove("make_thing_hide")
        add_todo_form.reset();
    })
}


function showEditTodoForm(todoId) {
    let todo = todos_Array.find(todo => todo.id == todoId);
    if (!todo) return;
    editingTodoId = todoId;
    add_todo_form.querySelector("#task_title").value = todo.title;
    add_todo_form.querySelector("#task_description").value = todo.description;
    add_todo_form.querySelector("#task_category").value = todo.category;
    add_todo_form.querySelector("#task_date").value = todo.dueDate;

    add_todo_overlay.classList.remove("make_thing_hide");
}


function hideAddTodoForm() {

    add_todo_form.reset();
    add_todo_overlay.classList.add("make_thing_hide")

}

// Add todo form event delegation
function makeAddTodoFormHide() {

    add_todo_form.addEventListener('click', (e) => {

        if (e.target.closest(".close_btn") || e.target.classList.contains("cancel_btn")) {
            hideAddTodoForm()
        }
    })
}

// Mark taks complete
function mark_task_complete(id) {
    console.log(id)
    let update_Array = todos_Array.map(todo => todo.id == id ? { ...todo, completed: true } : todo);
    localStorage.setItem("todos", JSON.stringify(update_Array))
    initiate_Todos();
    get_number_of_c_todos();
    update_c_todos();
}


function delete_todo(id) {
    console.log(id)
    let wanted_obj_indx = todos_Array.findIndex(todo => todo.id == id)
    todos_Array.splice(wanted_obj_indx, 1)
    localStorage.setItem("todos", JSON.stringify(todos_Array))
    initiate_Todos()
    get_number_of_c_todos();
    update_c_todos();
}


// function for Add todos
function addTodo() {

    let add_todo_form = document.querySelector(".add_todo_form");
     uniqueId = crypto.randomUUID()

    add_todo_form.addEventListener("submit", (e) => {

        e.preventDefault();

        let task_title = add_todo_form.querySelector("#task_title").value;
        let task_description = add_todo_form.querySelector("#task_description").value;
        let task_category = add_todo_form.querySelector("#task_category").value;
        let task_date = add_todo_form.querySelector("#task_date").value;


        // EDIT
        if (editingTodoId !== null) {

            let todo = todos_Array.find(todo => todo.id == editingTodoId);
            console.log("todo category ", todo.category, "the task category is ", task_category)
            todo.title = task_title;
            todo.description = task_description;
            todo.category = task_category;
            todo.dueDate = task_date;

        }

        // ADD
        else {

            const new_task = {
                id: uniqueId,
                title: task_title,
                description: task_description,
                category: task_category,
                completed: false,
                dueDate: task_date
            };

            todos_Array.push(new_task);
            uniqueId = crypto.randomUUID()
        }


        localStorage.setItem("todos", JSON.stringify(todos_Array));

        initiate_Todos();

        hideAddTodoForm();

        add_todo_form.reset();

        editingTodoId = null;

    });
}


function changeThemeSettings() {
    let getTheme_options = document.querySelector("#change_theme");
    let buttons = getTheme_options.querySelectorAll(".theme_option");


    getTheme_options.addEventListener("click", (e) => {
        console.log("Event capturing Demo")
        console.log(" Parent clicked")
        let themeButton = e.target.closest(".theme_option");
        if (!themeButton) return;
        buttons.forEach(button => {
            button.classList.remove("active")
        });

        if (themeButton.dataset.theme == "dark") {
            console.log("try dark theme active..")
            themeButton.classList.add("active")
            localStorage.setItem("theme", "dark")
            updateTheme()
            console.log("child clicked clicked")

        } else if (themeButton.dataset.theme == "light") {
            console.log("try light theme active...")
            themeButton.classList.add("active")
            localStorage.setItem("theme", "light")
            console.log("child clicked clicked")
            updateTheme()
        }

    });
}

function changeFontSettings(){
    let font_options = document.querySelector(".font_options");
    console.log("font options", font_options)
    font_options.addEventListener("click", (e) => {
        let fontButton = e.target.closest(".font_option");
        console.log("font button clicked", fontButton)
        if (!fontButton) return;
        let font = fontButton.dataset.font;
        localStorage.setItem("font", font);
        updateFontStyle();
        
    })
}


// sir g this logic is for event bubbling
const output = document.querySelector("#output");
const bubblingBox = document.querySelector(".eventBubbling");
const bubblingParent = bubblingBox.querySelector(".parent");
const bubblingChild = bubblingBox.querySelector(".child");



function eventbubblingFired() {
    
    console.log("Event Bubbling Fired");

    output.innerHTML += `
        <p>Button - Target</p>
    `;
}


function eventcapturingFired() {
    console.log("Event Capturing Fired");
    

    output.innerHTML += `
        <p>Button - Target</p>
    `;
}


bubblingChild.addEventListener("click", () => {
    
    console.log("Child - Bubbling");

    output.innerHTML += `
        <p>Child - Bubbling</p>
    `;
});

bubblingParent.addEventListener("click", () => {
    
    console.log("Parent - Bubbling");

    output.innerHTML += `
        <p>Parent - Bubbling</p>
    `;
});

// and this logic is for event capturing
const capturingBox = document.querySelector(".eventcapturing");
const capturingParent = capturingBox.querySelector(".parent");
const capturingChild = capturingBox.querySelector(".child");



capturingParent.addEventListener("click", () => {
   
    console.log("Parent - Capturing");

    output.innerHTML += `
        <p>Parent - Capturing</p>
    `;
}, true);

capturingChild.addEventListener("click", () => {
    console.log("Child - Capturing");

    output.innerHTML += `
        <p>Child - Capturing</p>
    `;
}, true);

function clearLogs(){
    output.innerHTML = "<h2>Event Order Logs</h2>"
}


logoHoverAnimation()
makeAddTodoFormHide()
showAddTodForm()
show_todos()
addTodo()
showTotal_completed()
get_number_of_c_todos()
update_c_todos()
changeThemeSettings()
updateTheme()
updateFontStyle();
changeFontSettings()

// Here are some concepts that sheryians want me to write its definations here

// 1 DIFFERENCE BETWEEN input.value AND input.getAttribute("input")

/* 
1)- input.value:- input.value give use the value of an input that a use enter in that input
2)- input.getAttribute("input"):- the getAttribute basically give use the the attributes of a tages now attributes is for example we have
this input <input type="text" id="task_title" placeholder="Enter task title">
here the type, id, placeholder... are the attribute of this input 
now if we do input.getAttribute("value") then it wil give us the value of the value attribute
like for example <input type="text" id="task_title" value="AwaisAhmad" placeholder="Enter task title">
in my example it will give us "AwaisAhmad"

=> Sir i created the event propagation demo in Dashboard page

    2 DIFFERENCE BETWEEN EVENT BUBBLING AND EVENT CAPTURING
1)- EVENT CAPTURING :-
we can imagen event bubbling like a real keyboard button when we want to 
press a button we first press the button cover then the the button cover
press the button rubber and then the rubber press the actual event and a value apear on the screan
in js the event capturing is something like this we click the button an event start prom
th parent to the child and then the child and then hit the target
2)- EVENT BUBBLING :-
the event bubbling is the opposite of the event capturing 
we can imagen event bubbling like a real keyboard button when we hit the button then the free the key/ button of keyboard first the event trigger and 
the value show us on screan then the event hit the button rubber and the button rubber hit the button cver on backwork
its like a bubbles that have gase in that bubble and when we free it  goes upword
in js the event bubling is like this when we trigger an event the event goes in upword side from target to child and then go to parent








*/