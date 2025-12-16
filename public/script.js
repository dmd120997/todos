const API_URL = "http://localhost:8080/todos";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let allTodos = [];
let currentFilter = localStorage.getItem("todoFilter") || "all";

const filterButtons = document.querySelectorAll(".filters button");

async function loadTodos() {
  const res = await fetch(API_URL);
  allTodos = await res.json();
  renderTodos();
}

function getFilteredTodos() {
  if (currentFilter === "active") {
    return allTodos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return allTodos.filter((todo) => todo.completed);
  }

  return allTodos;
}

function updateFilterButtons() {
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === currentFilter);
  });
}

function renderTodos() {
  todoList.innerHTML = "";

  const todosToShow = getFilteredTodos();
  todosToShow.forEach(addTodoToDOM);

  updateFilterButtons();
}

function addTodoToDOM(todo) {
  const li = document.createElement("li");
  li.dataset.id = todo.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () =>
    toggleTodo(todo.id, checkbox.checked)
  );

  const span = document.createElement("span");
  span.textContent = todo.title;
  if (todo.completed) span.classList.add("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  todoList.appendChild(li);
}

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = todoInput.value.trim();
  if (!title) return;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  const todo = await res.json();
  allTodos.push(todo);
  renderTodos();

  todoInput.value = "";
});

async function toggleTodo(id, completed) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });

  const updatedTodo = await res.json();

  const index = allTodos.findIndex((t) => t.id === updatedTodo.id);
  allTodos[index] = updatedTodo;

  renderTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  allTodos = allTodos.filter((t) => t.id !== id);
  renderTodos();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    localStorage.setItem("todoFilter", currentFilter);
    renderTodos();
  });
});

loadTodos();
