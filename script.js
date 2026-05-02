
const addTodoBtn = document.getElementById('addTodoBtn');
const title = document.getElementById('taskTitle'); 


let taskList = JSON.parse(localStorage.getItem('todoTaskStorage')) || 
[];

window.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    getUNcheckedCount()
})

const display = document.getElementById('display')


addTodoBtn.addEventListener('click', (e) => {
    console.log('im clicked')
    // e.preventDefault()
    const inputVal = document.getElementById('inputNewTask').value.trim()
    const checkboxVal = document.querySelector('.todoCheckbox');
    const newTasks = {
        id: Date.now(),
        titleIn: inputVal,
        completed : false
    }
    const inputField = document.getElementById('inputNewTask')
    if (newTasks.titleIn === "") {
        console.log('enter title')
        inputField.style.border = "1px solid red";
        inputField.placeholder = "Enter your Title"

        return
    }
    
    
    taskList.push(newTasks);
    

    const task = createTodo(newTasks)

    
    display.append(task)
    saveToStorage();
    inputField.value = "";
});

function createTodo(titleObject) {
    const taskContainer = document.createElement('div');
    taskContainer.className = 'taskContainer';
    const taskSection1 = document.createElement('div');
    taskSection1.className = 'task1'
    const h4 = document.createElement('h4');
    h4.className = 'taskTitle';
    h4.textContent = titleObject.titleIn;



    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todoCheckbox';
   
    checkbox.addEventListener('click', () => {
        h4.classList.toggle('completed')
        h4.style.color = checkbox.checked ? '#967474' : '#4E4E4E';
        const taskIndex = taskList.findIndex(t => t.id === titleObject.id);
        if (taskIndex !== -1) {
            taskList[taskIndex].completed = checkbox.checked
        }
        saveToStorage();
        getUNcheckedCount()
        
    })
     if (titleObject.completed) {
        h4.classList.toggle('completed')
        h4.style.color = '#967474';
    }
    checkbox.checked = titleObject.completed;

    taskSection1.append(checkbox,h4)

    
    

    const span = document.createElement('span');
    span.className ='delBtn'
    span.addEventListener('click', () => {
        taskContainer.remove();
        taskList = taskList.filter(t => t.id !==titleObject.id);
        saveToStorage()
    });

    const i = document.createElement('i');
    i.className = 'fa-solid fa-multiply';

    span.append(i);

    taskContainer.append(taskSection1,span);

    return taskContainer


}

function saveToStorage() {
    localStorage.setItem('todoTaskStorage', JSON.stringify(taskList));
}

function renderTasks() {
    display.innerHTML = "";
    taskList.forEach(tasks => {
        const card = createTodo(tasks);
        display.append(card);
    })
}

function getUNcheckedCount() {
    const allcheckBoxes = document.querySelectorAll('.todoCheckbox');
    const unChecked = Array.from(allcheckBoxes).filter(box => !box.checked);
    const unCompletedList = document.getElementById('unCompletedList');

    unCompletedList.textContent = `Your remaining todos: ${unChecked.length}`
    console.log(unChecked.length)
    return unChecked.length
}



// let remianingList = 