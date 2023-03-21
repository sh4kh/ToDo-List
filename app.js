'use strict'

//Selectors 
const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
const todoList = document.querySelector('.todo__list');

//Event Listeners 
todoButton.addEventListener('click', todoAdd);
todoList.addEventListener('click', checkDelete);


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

