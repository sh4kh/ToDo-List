'use strict'

//Selectors 
const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list');
const filter = document.getElementById('todos-filter');



//Event Listeners 
todoButton.addEventListener('click', todoAdd);
todoList.addEventListener('click', checkDelete);
filter.addEventListener('change', filterToDos);


//Functions 
function todoAdd(event) {
    event.preventDefault();
    //Check if inpute value is empty
    if (!todoInput.value) return;
    //Create todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo__item');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.textContent = todoInput.value;
    todoDiv.append(newTodo);
    //CHECK Button 
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('item__btn_complete', 'item__btn');
    todoDiv.append(completeButton);
    //Delete Button 
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('item__btn_trash', 'item__btn');
    todoDiv.append(deleteButton);

    todoList.append(todoDiv);

    todoInput.value = '';
}


function checkDelete(event) {
    const target = event.target;
    //Delete todo
    if (event.target.classList.contains('item__btn_trash')) {
        const todo = target.parentElement;
        todo.classList.add('deleted');
        todo.ontransitionend = function() {
            todo.remove();
        }
    }
    //Check todo
    if (event.target.classList.contains('item__btn_complete')) {
        const todo = target.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterToDos() {
    //Get all todos
    const todos = Array.from(todoList.children);   
    
    //Check cases for different options from select
    switch(this.value) {
        case 'all': 
            todos.forEach(function(todo) {
                todo.style.display = 'flex';
            })
            break;

        case 'completed':
            todos.forEach(function(todo) {
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
            })
            break;

        case 'uncompleted':
            todos.forEach(function(todo) {
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
            })
    }
}

