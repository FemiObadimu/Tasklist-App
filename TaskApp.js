//define variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const iconL = document.querySelector("#light");
const iconD = document.querySelector("#dark");
const mainB = document.querySelector("#main");

//load EventListeners
loadEventListeners();

function loadEventListeners() {
  //dom load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //iconL should make it light
  iconL.addEventListener("click", turnPageLight);
  //iconD should make it dark
  iconD.addEventListener("click", turnPageDark);

  //add task
  form.addEventListener("submit", addTask);
  //remove tasks
  taskList.addEventListener("click", removeTask);
  //clear task
  clearBtn.addEventListener("click", clearTasks);
  //filter task
  filter.addEventListener("keyup", filterTasks);
}

//get task from local storage

function getTasks() {
  let task;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //create Element
    const li = document.createElement("li");
    //add classname to Element
    li.className = "collection-item";
    //create textnode and append child
    li.appendChild(document.createTextNode(task));
    //create link element
    const link = document.createElement("a");
    //create link classname
    link.className = "delete-item secondary-content";
    //add remove icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);

    //append li to the ul
    taskList.appendChild(li);
  });
}

//add task

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add Certain Task");
  }

  //create Element
  const li = document.createElement("li");
  //add classname to Element
  li.className = "collection-item";
  //create textnode and append child
  li.appendChild(document.createTextNode(taskInput.value));
  //create link element
  const link = document.createElement("a");
  //create link classname
  link.className = "delete-item secondary-content";
  //add remove icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append link to li
  li.appendChild(link);

  //append li to the ul
  taskList.appendChild(li);

  //store task in local storage

  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = "";

  e.preventDefault();
}

//store task

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you Sure")) {
      e.target.parentElement.parentElement.remove();

      //remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove task from local storage

function removeTaskFromLocalStorage(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear task

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clear from local storage
  clearTasksFromLocalStorage();
}

//clear  tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter task

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// iconL section

function turnPageLight() {
  if ((iconL.style.color = "orange")) {
    document.body.style.backgroundColor = "white";
    iconL.style.display = "none";
    iconD.style.display = "block";
    mainB.style.backgroundColor = "white";
    taskInput.style.color = "black";
    filter.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
  }
}

//iconD section

function turnPageDark() {
  if ((iconD.style.color = "black")) {
    document.body.style.backgroundColor = "black";
    iconL.style.display = "block";
    mainB.style.backgroundColor = "black";
    iconD.style.display = "none";
    taskInput.style.color = "white";
    filter.style.color = "white";
  } else {
    document.body.style.backgroundColor = "white";
  }
}
