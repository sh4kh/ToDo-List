// Selectors
const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list');
const filter = document.getElementById('todos-filter');

// Event Listeners
document.addEventListener('DOMContentLoaded', showLocalTodos);
todoButton.addEventListener('click', todoAddFromInput);
todoList.addEventListener('click', checkDelete);
filter.addEventListener('change', filterToDos);

// Functions
function todoAddFromInput(event) {
  event.preventDefault();
  const inputValue = todoInput.value;
  // Check if inpute value is empty
  if (!inputValue) return;
  // Save todo to local storage
  saveToLocalStorage(inputValue);
  todoAdd(inputValue);
  todoInput.value = '';
}

// Create todo HTML element
function todoAdd(value, isCompleted) {
  // Create todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo__item');
  if (isCompleted) {
    todoDiv.classList.add('completed');
  }
  // Create LI
  const newTodo = document.createElement('li');
  newTodo.textContent = value;
  todoDiv.append(newTodo);
  // CHECK Button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  completeButton.classList.add('item__btn_complete', 'item__btn');
  todoDiv.append(completeButton);
  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add('item__btn_trash', 'item__btn');
  todoDiv.append(deleteButton);

  todoList.append(todoDiv);
  return todoDiv;
}

function checkDelete(event) {
  const { target } = event;
  const todo = target.parentElement;
  const todoValue = todo.children[0].textContent;
  // Delete todo
  if (event.target.classList.contains('item__btn_trash')) {
    todo.classList.add('deleted');
    removeLocalTodos(todoValue);
    todo.ontransitionend = function () {
      todo.remove();
    };
  }
  // Check todo
  if (event.target.classList.contains('item__btn_complete')) {
    todo.classList.toggle('completed');
    // Check if todo is still completed. 
    //If yes we save it to localstorage by the 'completed' key else we delete it from storage
    if (todo.classList.contains('completed')) {
      saveCompletedToLocal(todoValue);
    } else {
      removeCompletedTodos(todoValue);
      console.log('removeCompletedTodos');
    }
  }
}

function filterToDos() {
  // Get all todos
  const todos = Array.from(todoList.children);

  // Check cases for different options from select
  switch (this.value) {
    case 'all':
      todos.forEach((todo) => {
        todo.style.display = 'flex';
      });
      break;

    case 'completed':
      todos.forEach((todo) => {
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'none';
        } else {
          todo.style.display = 'flex';
        }
      });
      break;

    case 'uncompleted':
      todos.forEach((todo) => {
        if (todo.classList.contains('completed')) {
          todo.style.display = 'none';
        } else {
          todo.style.display = 'flex';
        }
      });
  }
}

function saveToLocalStorage(todo) {
  // Check if local storage has smth
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function saveCompletedToLocal(todo) {
  // Check if local storage has smth
  let completed;
  if (localStorage.getItem('completed') === null) {
    completed = [];
  } else {
    completed = JSON.parse(localStorage.getItem('completed'));
  }
  completed.push(todo);
  localStorage.setItem('completed', JSON.stringify(completed));
}

function getTodos(key) {
  if (!localStorage.getItem(key) || JSON.parse(localStorage.getItem(key)).length === 0) {
    console.log(`${key} localstorage is empty`);
    return;
  }
  // Return created before todo array
  return JSON.parse(localStorage.getItem(key));
}

function showLocalTodos() {
  const localTodos = getTodos('todos');
  const completedTodos = getTodos('completed');
  let isCompleted;

  // Check if localstorage has smth
  if (!localTodos) return;
  localTodos.forEach((todo) => {
    if (completedTodos && completedTodos.includes(todo)) {
      isCompleted = true;
    } else {
      isCompleted = false;
    }
    todoAdd(todo, isCompleted);
  });
}

function removeLocalTodos(todo) {
  const localTodos = getTodos('todos');
  // Check if localstorage has smth
  if (!localTodos) return;
  localTodos.splice(localTodos.indexOf(todo), 1);
  localStorage.setItem('todos', JSON.stringify(localTodos));
}

function removeCompletedTodos(todo) {
  const completedTodos = getTodos('completed');
  // Check if localstorage has smth
  if (!completedTodos) return;
  completedTodos.splice(completedTodos.indexOf(todo), 1);
  localStorage.setItem('completed', JSON.stringify(completedTodos));
}
