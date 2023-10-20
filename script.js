const tasks= JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.querySelector('.task-list');


function addNew(){
    const newForm = document.querySelector('.form-container');
    const buttonRow = document.querySelector('.button-row');
    newForm.style.display = "block";
    buttonRow.style.display = "none";
}
function addTask() {
    const newTask = document.querySelector('#new-task');
    const dueDate = document.querySelector('#due-date');
    const priority = document.querySelector('#priority'); 
    const id = new Date().getTime();

    
    tasks.push({name: newTask.value, id: id, dueDate: dueDate.value, priority: priority.value, status:"Incomplete"});
    
    displayTasks(tasks);
    newTask.value = "";
    dueDate.value = "";
    document.querySelector('.form-container').style.display = "none";
    document.querySelector('.button-row').style.display = "grid";
    saveTasks();
}

function displayTasks(displayItems){
    taskList.innerHTML = "";
    displayItems.forEach((item) => {
        taskList.appendChild(createLine(item));
    });
}

function editTask(editTarget){
    const taskToEdit = document.getElementById(editTarget);
    const pulledTask = tasks.find((task) => task.id == editTarget);
    const priorityOptions = ["1-High", "2-Medium", "3-Low"];
    const statusOptions = ["Incomplete", "Completed"];
   
    taskToEdit.innerHTML = "";
    const taskForm = document.createElement("input");
    taskForm.classList =  "form-box";
    taskForm.id = "update-name";
    taskForm.value = pulledTask.name;
    taskToEdit.appendChild(taskForm);

    const dateForm = document.createElement("input");
    dateForm.classList = "form-box";
    dateForm.type = "date";
    dateForm.id = "update-due-date";
    dateForm.value = pulledTask.dueDate;
    taskToEdit.appendChild(dateForm);

    const priorityDrop = document.createElement("select");
    priorityDrop.classList = "form-box";
    priorityDrop.id = "update-priority";
    priorityOptions.forEach((priority) => {
        const option = document.createElement("option");
        option.value = priority;
        option.innerText = priority;
        if(priority === pulledTask.priority){
            option.setAttribute("selected", true);
        }
        priorityDrop.appendChild(option);
    });
    taskToEdit.appendChild(priorityDrop);
    const statusDrop = document.createElement("select");
    statusDrop.classList = "form-box";
    statusDrop.id = "update-status";
    statusOptions.forEach((status) => {
        const option = document.createElement("option");
        option.value = status;
        option.innerText = status;
        if(status === pulledTask.status){
            option.setAttribute("selected", true);
        }
        statusDrop.appendChild(option);
    });
    taskToEdit.appendChild(statusDrop);

    const updateButton = document.createElement("button");
    updateButton.innerText = "Update";
    updateButton.addEventListener("click", () => updateTask(taskForm.value, dateForm.value, priorityDrop.value, statusDrop.value, editTarget));
    taskToEdit.appendChild(updateButton);
}

function updateTask(newTaskName, newDue, newPriority, newStatus, editTarget){
    tasks.forEach((task) => {
        if (task.id == editTarget){
            task.name = newTaskName;
            task.dueDate = newDue;
            task.priority = newPriority;
            task.status = newStatus;
        }
    })
    saveTasks();
    displayTasks(tasks);
}

function deleteTask(deleteTarget){
    tasks.forEach((task, index) => {
        if (task.id == deleteTarget){
            tasks.splice(index, 1);
        }
    })
    saveTasks();
    if(tasks.length === 0){
        addNew();
    }
    displayTasks(tasks);
}

function createLine(lineItem){
    const displayLine = document.createElement('div');
    displayLine.classList = "task-item";
    displayLine.id = lineItem.id;
    const displayName = document.createElement('div');
    displayName.innerText = lineItem.name;
    displayLine.appendChild(displayName);
    const displayDue = document.createElement('div');
    displayDue.innerText = lineItem.dueDate;
    displayLine.appendChild(displayDue);
    const displayPriority = document.createElement('div');
    displayPriority.innerText = lineItem.priority;
    displayLine.appendChild(displayPriority);
    const displayStatus = document.createElement('div');
    displayStatus.innerText = lineItem.status;
    displayLine.appendChild(displayStatus);
    if (lineItem.status != "Completed"){
        const editButton = document.createElement('button');
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => editTask(lineItem.id));
        displayLine.appendChild(editButton);
    }
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(lineItem.id));
    displayLine.appendChild(deleteButton);
    return displayLine;
}

function showHigh(tasks){
    const highTasks = tasks.filter((task) => task.priority === "1-High");
    displayTasks(highTasks);
}

function showMedium(tasks){
    const mediumTasks = tasks.filter((task) => task.priority === "2-Medium");
    displayTasks(mediumTasks);
}

function showLow(tasks){
    const lowTasks = tasks.filter((task) => task.priority === "3-Low");
    displayTasks(lowTasks);
}

function showComplete(tasks){
    const completeTasks = tasks.filter((task) => task.status === "Completed");
    displayTasks(completeTasks);
}

function showIncomplete(tasks){
    const incompleteTasks = tasks.filter((task) => task.status === "Incomplete");
    displayTasks(incompleteTasks);
}

function sortDue(tasks){
    if(document.querySelector('.task-list').classList.contains("ascending")){
        document.querySelector('.task-list').classList.remove("ascending");
        const sortedTasks = tasks.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
        displayTasks(sortedTasks);
    }
    else{
    document.querySelector('.task-list').classList.add("ascending");
    const sortedTasks = tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    displayTasks(sortedTasks);
    }
}

function sortPriority(tasks){
    let sortedTasks = [];
    if (document.querySelector('.task-list').classList.contains("ascending-priority")){
        document.querySelector('.task-list').classList.remove("ascending-priority");
        sortedTasks = tasks.sort((a, b) => b.priority.localeCompare(a.priority));
    }
    else {
        document.querySelector('.task-list').classList.add("ascending-priority");
        sortedTasks = tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    }
            
    displayTasks(sortedTasks);
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

if (tasks.length === 0){
    addNew();
}
else {
    displayTasks(tasks);
}