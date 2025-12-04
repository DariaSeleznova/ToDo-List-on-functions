let taskNameInput = document.querySelector("#task-name-input");
let addTaskButton = document.querySelector("#task-btn-add");
let startMessage = document.querySelector("#start-message");
let taskList = document.querySelector(".task-list");
// CALENDAR
const datePicker = flatpickr("#task-date-input", {
    clickOpens: false,
    dateFormat: "d-m-Y",
    minDate: "today",
    locale: { firstDayOfWeek: 1 }
});
const input = document.querySelector("#task-date-input");

input.addEventListener("click", (e) => {
    e.stopPropagation();
    datePicker.isOpen ? datePicker.close() : datePicker.open();
});

document.addEventListener("click", () => datePicker.close());

addTaskButton.addEventListener("click", addTaskHandler);

taskNameInput.addEventListener("keydown", function (e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") addTaskHandler();
})


function createTask(text, deadline) {
    let div = document.createElement("div");
    div.classList.add("task");

    let p = document.createElement("p");
    p.innerText = text;

    let dateP = document.createElement("span");
    dateP.classList.add("deadline");
    dateP.innerText = deadline ? `${deadline}` : "";

    let panelDiv = document.createElement("div");
    panelDiv.classList.add("panelBtn");

    let input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("check");
    input.addEventListener("change", changeTaskState);

    let btnDelete = document.createElement("button");
    btnDelete.classList.add("remove");
    btnDelete.addEventListener("click", removeTask);

    let btnEdit = document.createElement("button");
    btnEdit.classList.add("edit");
    btnEdit.addEventListener("click", editTaskText);

    panelDiv.append(dateP);
    panelDiv.append(btnEdit);
    panelDiv.append(input);
    panelDiv.append(btnDelete);

    div.append(p);
    div.append(panelDiv);


    return div;
}

function changeTaskState() {
    let taskDiv = this.closest(".task");
    let editBtn = taskDiv.querySelector(".edit");

    if (this.checked) {
        taskDiv.classList.add("completed");
        if (editBtn) editBtn.style.display = "none";

    } else {
        taskDiv.classList.remove("completed");
        if (editBtn) editBtn.style.display = "inline-block";
    }
}

function addTaskHandler() {
    let name = taskNameInput.value.trim();
    let date = document.querySelector(".date-input").value;

    if (name) {
        if (!startMessage.hidden) startMessage.hidden = true;

        let newTask = createTask(name, date);
        newTask.setAttribute('id', `${date}-${name}`);
        taskList.append(newTask);

        taskNameInput.value = "";
        datePicker.clear();

    } else {
        alert("Enter the task");
    }
}

function removeTask() {
    this.closest(".task").remove();

    let tasksLeft = document.querySelectorAll(".task");
    if (tasksLeft.length === 0) {
        startMessage.hidden = false;
    }
}

function editTaskText() {
    let taskDiv = this.closest(".task");
    let p = taskDiv.querySelector("p");
    let dateSpan = taskDiv.querySelector(".deadline");

    if (this.dataset.mode === "editing") {
        let textInput = taskDiv.querySelector("input.edit-input");
        let dateInput = taskDiv.querySelector("input.edit-date");

        p.innerText = textInput.value;
        dateSpan.innerText = dateInput.value;

        p.hidden = false;
        dateSpan.hidden = false;


        textInput.remove();
        dateInput.remove();

        this.classList.remove("ok");
        this.classList.add("edit");
        this.innerText = "";
        this.dataset.mode = "";
        return;
    }

    let textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = p.innerText;
    textInput.classList.add("edit-input");

    let dateInput = document.createElement("input");
    dateInput.type = "text";
    dateInput.value = dateSpan.innerText;
    dateInput.classList.add("edit-date");

    flatpickr(dateInput, {
        dateFormat: "d-m-Y",
        minDate: "today",
        locale: { firstDayOfWeek: 1 }
    });

    p.hidden = true;
    dateSpan.hidden = true;

    p.after(textInput);
    dateSpan.after(dateInput);

    this.classList.remove("edit");
    this.classList.add("ok");
    this.innerText = "ok";
    this.dataset.mode = "editing";
}



