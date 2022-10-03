//Referencias en el html

import { Todo } from '../classes';
import {todoList} from '../index'





const divTodoList = document.querySelector('.todo-list');
const txtiNPUT = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters')
const anchorFiltros = document.querySelectorAll('.filtro')


export const creatTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${ (todo.completado)?'completed' : '' }" data-id="${todo.id}">
        <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
        <label>${todo.tarea}</label>
     <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>

`

const div = document.createElement('div')

div.innerHTML = htmlTodo;

divTodoList.append(div)

return div

}

txtiNPUT.addEventListener('keyup',(event)=>{
    
    if(event.keyCode === 13 && txtiNPUT.value.length>0){
        const nuevoTodo = new Todo(txtiNPUT.value);
        todoList.nuevoTodo(nuevoTodo);

        console.log(todoList)

        creatTodoHtml(nuevoTodo);
        txtiNPUT.value='';
    }
});

divTodoList.addEventListener('click',(event)=>{
    
    const nombreElemento = event.target.localName //input, label buttom
    const todoElemento   = event.target.parentElement.parentElement;

    const todoId         = todoElemento.getAttribute('data-id')

    

    
    
    
    if(nombreElemento.includes('input')) {// Click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed')
        
        
    
    }else if (nombreElemento.includes('button')){
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento.parentElement )
        
        
    }
    
});

ulFilters.addEventListener('click',(event)=>{
    
    const filtro = event.target.text

    if(!filtro) {return;}

    anchorFiltros.forEach(elemento=>elemento.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed')
        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden')
                }
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden')
                }
        }
    }

})