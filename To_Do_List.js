document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  addTask(taskText);
  saveTasks();
  taskInput.value = "";
});

function addTask(taskText) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.textContent = taskText;

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.classList.add("complete");
  completeButton.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks(); // Save tasks after completion
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", () => {
    taskList.removeChild(li);
    saveTasks(); // Save tasks after deletion
  });

  li.appendChild(completeButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  const taskListItems = document.querySelectorAll("#taskList li");
  taskListItems.forEach((item) => {
    tasks.push({
      text: item.firstChild.textContent,
      completed: item.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.text);
    if (task.completed) {
      const taskListItems = document.querySelectorAll("#taskList li");
      taskListItems[taskListItems.length - 1].classList.add("completed");
    }
  });
}

window.addEventListener("load", loadTasks);
