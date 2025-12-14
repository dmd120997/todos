const API_URL = "http://localhost:8080/todos";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

async function loadTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();
  todoList.innerHTML = "";
  todos.forEach(addTodoToDOM);
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
  addTodoToDOM(todo);
  todoInput.value = "";
});

async function toggleTodo(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  loadTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTodos();
}

loadTodos();
