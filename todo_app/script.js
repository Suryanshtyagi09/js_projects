const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const searchInput = document.getElementById("searchInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// 💾 Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ➕ Add Task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  const task = {
    id: Date.now(),
    text,
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";

  saveTasks();
  renderTasks();
});

// 🔄 Toggle Task
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  );

  saveTasks();
  renderTasks();
}

// ❌ Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  saveTasks();
  renderTasks();
}

// ✏️ Edit Task
function editTask(id) {
  const newText = prompt("Edit your task:");

  if (newText === null || newText.trim() === "") return;

  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, text: newText.trim() }
      : task
  );

  saveTasks();
  renderTasks();
}

// 🔍 Filter buttons
const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// 🔍 Search
searchInput.addEventListener("input", () => {
  renderTasks();
});

// 🧠 Render Tasks
function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  // Filter
  if (currentFilter === "completed") {
    filteredTasks = filteredTasks.filter(task => task.completed);
  } else if (currentFilter === "pending") {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  }

  // Search
  const searchText = searchInput.value.toLowerCase();
  filteredTasks = filteredTasks.filter(task =>
    task.text.toLowerCase().includes(searchText)
  );

  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">
        ${task.text}
      </span>
      <div>
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="editTask(${task.id})">✏️</button>
        <button onclick="deleteTask(${task.id})">❌</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateCount();
}

// 📊 Counter
function updateCount() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  taskCount.textContent = `Total: ${total} | Completed: ${completed}`;
}

// 🚀 Init
renderTasks();