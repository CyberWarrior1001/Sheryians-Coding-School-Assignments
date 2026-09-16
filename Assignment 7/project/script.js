let transactions = [];
// some variables
let wantedEditTransactionId = null;

let myChart = null;
let uniqueId = crypto.randomUUID();
let currency = null;
let currency_symbol = null;
function make_symbol() {
    if (currency === "USD") {
        return "$";
    } else if (currency === "EUR") {
        return "€";
    } else if (currency === "GBP") {
        return "£";
    } else if (currency === "PKR") {
        return "₨";
    } else if (currency === "INR") {
        return "₹";
    }

    return "$"; // default
}

function get_currency_change() {
    currency = localStorage.getItem("currency") || "USD";
    console.log(currency);
    currency_symbol = make_symbol();
    const current_currency = document.querySelector("#primaryCurrency");
    current_currency.value = currency;
}
get_currency_change();
currency_symbol = make_symbol();
function changeSettings() {
    const current_currency = document.querySelector("#primaryCurrency");

    // change currency
    const currency = current_currency.value;
    console.log(currency);
    localStorage.setItem("currency", currency);
    get_currency_change();
    transactionCalculator();
    render_transaction(transactions);

    // change user name
    let uname = document.querySelector("#fullName").value;

    localStorage.setItem("Username", uname);
    let name = document.querySelector("#name");
    name.textContent = uname;
    alert("Setting Saved Successfully!");
}

// watchChangeCurrency()

// localStorage.setItem("transactions", JSON.stringify(transactions))
function pushAllTransactions() {
    let all_transactions = localStorage.getItem("transactions");
    if (!all_transactions) {
        return;
    }
    transactions = JSON.parse(all_transactions);
}
pushAllTransactions();

function updateChart(income, expense) {
    const ctx = document.getElementById("cashFlowChart").getContext("2d");

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: "bar",

        data: {
            labels: ["Income vs Expenses"],

            datasets: [
                {
                    label: "Income",
                    data: [income],
                    backgroundColor: "#166534",
                    borderRadius: 4,
                },

                {
                    label: "Expenses",
                    data: [expense],
                    backgroundColor: "#991b1b",
                    borderRadius: 4,
                },
            ],
        },

        options: {
            // responsive: true,
            // maintainAspectRatio: false,

            scales: {
                y: {
                    beginAtZero: true,
                },
            },

            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
    });
}

// query for convert_bw_sgnup_and_Lgn()
let tologin = document.querySelector("#make_form_Login");
let tosignup = document.querySelector("#make_form_signup");
// Query auth form
let userNameInput = document.querySelector("#username");
let passwordInput = document.querySelector("#password");
// man navbar
let main_navbar = document.querySelector("#main_nav");
// sideNav
let sideNav = document.querySelector(".nav-menu");
// all transactions table body
let transactions_body = document.querySelector("#transactions_body");
// containers
let dashboard_container = document.querySelector(".dashboard_container");
let setting_container = document.querySelector(".setting_container");

// Add Edit transaction from selectors
let transaction_type = document.querySelector("#transactionType");
let transaction_desc = document.querySelector("#transactionDesc");
let transaction_amount = document.querySelector("#transactionAmount");
let transaction_date = document.querySelector("#transactionDate");
let transaction_category = document.querySelector("#transactionCategory");
let add_edit_transaction = [
    transaction_type,
    transaction_desc,
    transaction_amount,
    transaction_date,
    transaction_category,
];
// transaction_type
// transaction_desc
// transaction_amount
// transaction_date
// transaction_category

let authStatus = null;
function checkauthStatus() {
    let status = localStorage.getItem("authState");

    let registration_container = document.querySelector(".registration_main");
    let complete_site_container = document.querySelector("main");
    registration_container.classList.remove("make_thing_hide");
    complete_site_container.classList.add("make_thing_hide");

    if (!status || status == "false") {
        authStatus = false;
        return;
    } else {
        authStatus = true;
    }

    let userName = localStorage.getItem("Username");
    registration_container.classList.add("make_thing_hide");
    complete_site_container.classList.remove("make_thing_hide");
    let name = document.querySelector("#name");
    name.textContent = userName;
}

function convert_bw_sgnup_and_Lgn(whicOne) {
    // make the form empty
    userNameInput.value = "";
    passwordInput.value = "";
    // query for signup
    let login_header = document.querySelector(".login-header");
    let login_submit = document.querySelector(".btn-login");
    let login_footer = document.querySelector(".login-footer");

    // query for login
    let signup_header = document.querySelector(".signup-header");
    let signup_submit = document.querySelector(".btn-Signup");
    let signup_footer = document.querySelector(".signup-footer");

    const authElements = [
        login_header,
        login_submit,
        login_footer,
        signup_header,
        signup_submit,
        signup_footer,
    ];
    const loginElement = [login_header, login_submit, login_footer];
    const signupElement = [signup_header, signup_submit, signup_footer];

    authElements.forEach((element) => {
        if (element) {
            element.classList.remove("make_thing_hide");
        }
    });
    if (whicOne == "signup") {
        loginElement.forEach((element) => {
            if (element) {
                element.classList.add("make_thing_hide");
            }
        });
    } else {
        signupElement.forEach((element) => {
            if (element) {
                element.classList.add("make_thing_hide");
            }
        });
    }
}

function conv_sgnup_and_Lgn_query_selector() {
    tologin.addEventListener("click", () => {
        convert_bw_sgnup_and_Lgn("login");
    });
    tosignup.addEventListener("click", () => {
        convert_bw_sgnup_and_Lgn("signup");
    });
}

function login() {
    let uname = userNameInput.value;
    let passwd = passwordInput.value;
    if (uname.trim() == "" || passwd.trim() == "") {
        return;
    }
    let storedUname = localStorage.getItem("Username");
    let storedPassword = localStorage.getItem("Password");
    if (!storedUname || !storedPassword) {
        userNameInput.value = "";
        passwordInput.value = "";
        alert("Pleas Create Account First!");
        convert_bw_sgnup_and_Lgn("signup");
        return;
    }
    if (storedUname !== uname && storedPassword !== passwd) {
        userNameInput.value = "";
        passwordInput.value = "";
        alert("Invalid Uname or Password!");
        return;
    }

    localStorage.setItem("authState", true);
    checkauthStatus();
}

function signUp() {
    let uname = userNameInput.value;
    let passwd = passwordInput.value;
    if (uname.trim() == "" || passwd.trim() == "") {
        return;
    }
    localStorage.setItem("Username", uname);
    localStorage.setItem("Password", passwd);

    alert("Credentials saved successfully to localStorage!");
    convert_bw_sgnup_and_Lgn("login");
}

function logout() {
    console.log("Logouted...");
    localStorage.setItem("authState", false);
    checkauthStatus();
}

function openSidebar() {
    sideNav.closest("aside").classList.add("sidebar-visible");
}

function closeSidebar() {
    sideNav.closest("aside").classList.remove("sidebar-visible");
}

function sideNaveNavLinks() {

    sideNav.addEventListener("click", (e) => {
        sideNav.closest("aside").classList.remove("sidebar-visible");

        let dashboardLink = e.target.closest(".dashboard");
        let settingLink = e.target.closest(".setting");
        let dshbrdLnk = document.querySelector(".dashboard");
        let sttngLnk = document.querySelector(".setting");

        dashboard_container.classList.add("make_thing_hide");
        setting_container.classList.add("make_thing_hide");
        dshbrdLnk.classList.remove("active");
        sttngLnk.classList.remove("active");

        if (dashboardLink) {
            console.log("activate dashboard....");
            dashboard_container.classList.remove("make_thing_hide");
            dshbrdLnk.classList.add("active");
        } else if (settingLink) {
            console.log("activate setting....");
            setting_container.classList.remove("make_thing_hide");
            sttngLnk.classList.add("active");
        }
    });
}

function render_transaction(transactions) {
    transactions_body.innerHTML = "";
    transactions.forEach((transaction) => {
        if (transaction.type == "expense") {
            transactions_body.innerHTML += `<tr id="${transaction.id}">
                                            <td class="col-date">${transaction.date}</td>
                                            <td class="col-desc">${transaction.description}</td>
                                            <td><span class="category-badge">${transaction.category}</span></td>
                                            <td><span class="amount-negative">-${currency_symbol}${transaction.amount}</span></td>
                                            <td>
                                                <div class="actions-cell">
                                                    <button onClick="edit_Transaction('${transaction.id}')" class="btn-action btn-edit" title="Edit"><i
                                                            class="fa-solid fa-pen"></i></button>
                                                    <button onClick="delete_Transaction('${transaction.id}')" class="btn-action btn-delete" title="Delete"><i
                                                            class="fa-solid fa-trash-can"></i></button>
                                                </div>
                                            </td>
                                        </tr>`;
        } else {
            transactions_body.innerHTML += `<tr id="${transaction.id}">
                                        <td class="col-date">${transaction.date}</td>
                                        <td class="col-desc">${transaction.description}</td>
                                        <td><span class="category-badge">${transaction.category}</span></td>
                                        <td><span class="amount-positive">+${currency_symbol}${transaction.amount}</span></td>
                                        <td>
                                            <div class="actions-cell">
                                                <button onClick="edit_Transaction('${transaction.id}')" class="btn-action btn-edit" title="Edit"><i
                                                        class="fa-solid fa-pen"></i></button>
                                                <button onClick="delete_Transaction('${transaction.id}')" class="btn-action btn-delete" title="Delete"><i
                                                        class="fa-solid fa-trash-can"></i></button>
                                            </div>
                                        </td>
                                    </tr>`;
        }
    });
}

function applyFilter() {
    let inpt = document.querySelector("#myQuery");
    let qselector = document.querySelector("#querySelector");

    inpt.addEventListener("input", (e) => {
        // Convert query to lowercase for a case-insensitive search
        let query = e.target.value.toLowerCase();

        let newTransactions = transactions.filter((transaction) => {
            return transaction.description.toLowerCase().includes(query);
        });

        render_transaction(newTransactions);
    });
    qselector.addEventListener("change", (e) => {
        let selectedType = e.target.value.toLowerCase();
        const matchesType = transactions.filter((transaction) => {
            return (
                selectedType === "all types" ||
                transaction.type.toLowerCase() === selectedType
            );
        });
        render_transaction(matchesType);
    });
}

function open_close_CardOverlay(whatdo) {
    let overlay = document.querySelector(".add_transaction_ovelay");
    dashboard_container.classList.add("make_thing_hide");
    setting_container.classList.add("make_thing_hide");
    overlay.classList.add("make_thing_hide");
    if (whatdo == "open") {
        overlay.classList.remove("make_thing_hide");
    } else {
        add_edit_transaction.forEach((a_e_transection, idx) => {
            if (idx == 0 || idx == 3) {
            } else {
                a_e_transection.value = "";
            }
        });
        overlay.classList.add("make_thing_hide");
        dashboard_container.classList.remove("make_thing_hide");
    }
}

function open_close_add_edit_Transaction(whicOne) {
    let add_transaction_header = document.querySelector(
        ".add_transaction_card-header",
    );
    let addTransactionBtn = document.querySelector("#add_transaction_btn");
    let edit_transaction_header = document.querySelector(
        ".edit_transaction_card-header",
    );
    let editTransactionBtn = document.querySelector("#edit_transaction_btn");
    let card_component_arr = [
        add_transaction_header,
        addTransactionBtn,
        edit_transaction_header,
        editTransactionBtn,
    ];
    card_component_arr.forEach((cardcomp) => {
        cardcomp.classList.add("make_thing_hide");
    });
    if (whicOne == "addForm") {
        add_transaction_header.classList.remove("make_thing_hide");
        addTransactionBtn.classList.remove("make_thing_hide");
    } else {
        edit_transaction_header.classList.remove("make_thing_hide");
        editTransactionBtn.classList.remove("make_thing_hide");
    }
}

function openAddTransaction() {
    open_close_CardOverlay("open");
    open_close_add_edit_Transaction("addForm");
}
function closeAddTransaction() {
    open_close_CardOverlay("close");
}

function save_form_transaction() {
    let trans_type = transaction_type.value;
    let trans_desc = transaction_desc.value;
    let trans_amount = transaction_amount.value;
    let trans_date = transaction_date.value;
    let trans_category = transaction_category.value;
    let newTransactionObj = {
        id: uniqueId,
        type: trans_type,
        description: trans_desc,
        amount: trans_amount,
        date: trans_date,
        category: trans_category,
    };
    uniqueId = crypto.randomUUID();
    transactions.push(newTransactionObj);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    pushAllTransactions();
    render_transaction(transactions);
    transactionCalculator();
    alert("Your Transaction Added Successfully.");
    open_close_CardOverlay("close");
}
function edit_form_transaction() {
    let trans_type = transaction_type.value;
    let trans_desc = transaction_desc.value;
    let trans_amount = transaction_amount.value;
    let trans_date = transaction_date.value;
    let trans_category = transaction_category.value;
    let newTransactionObj = {
        id: uniqueId,
        type: trans_type,
        description: trans_desc,
        amount: trans_amount,
        date: trans_date,
        category: trans_category,
    };
    uniqueId = crypto.randomUUID();
    let indxOfEditTransaction = transactions.findIndex(
        (transaction) => transaction.id == wantedEditTransactionId,
    );
    transactions.splice(indxOfEditTransaction, 1, newTransactionObj);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    pushAllTransactions();
    render_transaction(transactions);
    transactionCalculator();
    alert("Your Transaction Updated Successfully.");
    open_close_CardOverlay("close");
}

function edit_Transaction(tid) {
    wantedEditTransactionId = tid;
    open_close_CardOverlay("open");
    open_close_add_edit_Transaction("editForm");
    let wantedtransactionObj = transactions.find(
        (transaction) => transaction.id == tid,
    );
    transaction_type.value = wantedtransactionObj.type;
    transaction_desc.value = wantedtransactionObj.description;
    transaction_amount.value = wantedtransactionObj.amount;
    transaction_date.value = wantedtransactionObj.date;
    transaction_category.value = wantedtransactionObj.category;
}
function delete_Transaction(tid) {
    console.log(tid);
    let indxOfDltTransaction = transactions.findIndex(
        (transaction) => transaction.id == tid,
    );
    transactions.splice(indxOfDltTransaction, 1);

    localStorage.setItem("transactions", JSON.stringify(transactions));
    pushAllTransactions();
    render_transaction(transactions);
    transactionCalculator();
    alert("Your Transaction Deleted Successfully.");
}

function transactionCalculator() {
    const totalIncome = transactions
        .filter((item) => item.type === "income")
        .reduce((total, item) => total + Number(item.amount), 0);

    const totalExpenses = transactions
        .filter((item) => item.type === "expense")
        .reduce((total, item) => total + Math.abs(Number(item.amount)), 0);

    const totalTransactions = transactions.length;

    const currentBalance = totalIncome - totalExpenses;

    updateChart(totalIncome, totalExpenses);
    let current_balance_card = document.querySelector("#current_balance");
    let income_card = document.querySelector("#income");
    let expences_card = document.querySelector("#expence");
    let transactons_card = document.querySelector("#total_transactions");

    current_balance_card.textContent = `${currency_symbol} ${currentBalance}`;
    income_card.textContent = `${currency_symbol} ${totalIncome}`;
    expences_card.textContent = `${currency_symbol} ${totalExpenses}`;
    transactons_card.textContent = `${totalTransactions}`;
}

function resetAll() {
    let ans = confirm(
        "⚠️ Delete Everything?\n\nThis will permanently delete your account, credentials, and all associated data. This action cannot be undone.\n\nAre you sure you want to continue?",
    );
    if (ans) {
        localStorage.clear();
        window.location.reload();
    }
}


function watchDarkMode() {

    const darkModeToggle = document.querySelector("#darkModeToggle");

    const savedMode = localStorage.getItem("theme");

    if (savedMode === "dark") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener("change", (e) => {

        if (e.target.checked) {

            document.body.classList.add("dark-mode");

            localStorage.setItem("theme", "dark");

        } else {

            document.body.classList.remove("dark-mode");

            localStorage.setItem("theme", "light");
        }

    });
}




watchDarkMode()

checkauthStatus();
conv_sgnup_and_Lgn_query_selector();
sideNaveNavLinks();
render_transaction(transactions);
applyFilter();
transactionCalculator();
