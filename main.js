//======================
//DOM INTERFACE ELEMENTS
//======================

//task name input field

let taskNameInput = document.querySelector("#task-name-input");

//add task button

let addTaskButton = document.querySelector("#task-btn-add");

//message 'No new task'

let startMessage = document.querySelector("#start-message");

//task list container

let taskList = document.querySelector(".task-list");

//filter button bar

let btnPanel = document.querySelector(".show-button-panel-hidden");

//filter buttons

let showAllBtn = document.querySelector("#showAllButton").addEventListener("click", showAllHandler);
let showCompleted = document.querySelector("#showNotCompleted").addEventListener("click", showNotCompletedHandler);

//main task storage (STATE APP)

let tasks = [];
//====================
// CALENDAR(Flatpickr)
//====================

//calendar initialization

const datePicker = flatpickr("#task-date-input", {
    clickOpens: false,
    dateFormat: "d-m-Y",
    minDate: "today",
    locale: { firstDayOfWeek: 1 }
});

//close/open the calendar on click

const input = document.querySelector("#task-date-input");

input.addEventListener("click", (e) => {
    e.stopPropagation();
    datePicker.isOpen ? datePicker.close() : datePicker.open();
});

//closing the calendar when clicking outside the field 

document.addEventListener("click", () => datePicker.close());

//==================
//TASK INPUT PANEL
//==================

//adding tasks on button

addTaskButton.addEventListener("click", addTaskHandler);

//adding tasks on 'Enter' button

taskNameInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") addTaskHandler();
})

//=========================
//PARSING FROM LOCALSTORAGE
//=========================

//After the page loads, we restore the tasks
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

// Getting tasks from localStorage

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (!savedTasks) return;
    tasks = JSON.parse(savedTasks);
    renderTasks(tasks);

    // Show the filter panel if there are tasks
    if (tasks.length > 0) {
        btnPanel.classList.remove("show-button-panel-hidden");
        btnPanel.classList.add("show-button-panel-active");
    }
}
//=====================
//DRAWING TASKS (RENDER)
//=====================

// the main function that manages the DOM

function renderTasks(list) {
    taskList.innerHTML = "";

    if (list.length === 0) {
        startMessage.hidden = false;
        return;
    }
    startMessage.hidden = true;

    // create a task DOM element
    list.forEach(task => {
        const { div, checkbox, editBtn, deleteBtn } = createTask(task);
        // if the task is completed, we apply styles
        if (task.completed) {
            div.classList.add("completed");
            editBtn.style.display = "none";
        }

        // checkbox - change status
        checkbox.addEventListener("change", () => {
            toggleTaskCompleted(task.id);
            renderTasks(tasks);
        });

        // editing
        editBtn.addEventListener("click", () => {
            editTaskText(task.id);
        });

        // delete
        deleteBtn.addEventListener("click", () => {
            removeTask(task.id);
        });

        taskList.append(div);
    });
}

//====================
// CREATE ONE TASK
//====================

// this function is ONLY responsible for creating the DOM

function createTask(task) {
    const div = document.createElement("div");
    div.className = "task";
    div.dataset.id = task.id;

    const p = document.createElement("p");
    p.textContent = task.text;

    const date = document.createElement("span");
    date.className = "deadline";
    date.textContent = task.date || "";

    const panel = document.createElement("div");
    panel.className = "panelBtn";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "check";
    checkbox.checked = task.completed;

    const editBtn = document.createElement("button");
    editBtn.className = "edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "remove";

    panel.append(date, editBtn, checkbox, deleteBtn);
    div.append(p, panel);

    return { div, checkbox, editBtn, deleteBtn };
}

//==================
// ADDING A TASK
//==================

function addTaskHandler() {
    let name = taskNameInput.value.trim();
    let date = document.querySelector("#task-date-input").value;

    if (name) {
        if (!startMessage.hidden) startMessage.hidden = true;
        let task = {
            id: Date.now(),
            text: name,
            date: date,
            completed: false
        };

        tasks.push(task);
        renderTasks(tasks);
        saveTasks();

        btnPanel.classList.remove("show-button-panel-hidden");
        btnPanel.classList.add("show-button-panel-active");

        taskNameInput.value = "";
        datePicker.clear();

    } else {
        alert("Enter the task");
    }
}

//==============
//EDIT TASK
//==============

function editTaskText(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const taskDiv = [...taskList.children].find(
        div => div.dataset.id == taskId
    );
    if (!taskDiv) return;

    if (taskDiv.dataset.mode === "editing") return;
    taskDiv.dataset.mode = "editing";

    const p = taskDiv.querySelector("p");
    const dateSpan = taskDiv.querySelector(".deadline");
    const checkbox = taskDiv.querySelector(".check");
    const editBtn = taskDiv.querySelector(".edit");

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = task.text;
    textInput.classList.add("edit-input");

    const dateInput = document.createElement("input");
    dateInput.type = "text";
    dateInput.value = task.date;
    dateInput.classList.add("edit-date");

    flatpickr(dateInput, {
        dateFormat: "d-m-Y",
        minDate: "today",
        locale: { firstDayOfWeek: 1 }
    });

    p.hidden = true;
    dateSpan.hidden = true;
    checkbox.style.display = "none";

    p.after(textInput);
    dateSpan.after(dateInput);

    editBtn.innerText = "OK";
    editBtn.classList.remove("edit");
    editBtn.classList.add("ok");

    editBtn.onclick = () => {
        task.text = textInput.value.trim();
        task.date = dateInput.value;

        taskDiv.dataset.mode = "";

        renderTasks(tasks);
        saveTasks();
    };
}

//===============
//DELETE TASK
//===============

function removeTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks(tasks);
    saveTasks();
    if (tasks.length === 0) {
        startMessage.hidden = false;
        btnPanel.classList.remove("show-button-panel-active");
        btnPanel.classList.add("show-button-panel-hidden");
    }
}

//=================
//COMPLETION STATUS
//=================

function toggleTaskCompleted(taskId) {
    let task = tasks.find(t => t.id == taskId);
    if (!task) return;
    task.completed = !task.completed;

    saveTasks();
}

//==============
//FILTERS
//==============

function showAllHandler() {
    renderTasks(tasks);
}

function showNotCompletedHandler() {
    const active = tasks.filter(task => !task.completed);
    renderTasks(active);
}

//======================
//SAVING TO LOCALSTORAGE
//======================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}






