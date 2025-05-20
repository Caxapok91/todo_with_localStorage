const listUl = document.getElementById("listWork");
const themeButton = document.getElementById("themeButton");
const inputTask = document.getElementById('input-text');
let data = JSON.parse(localStorage.getItem('work'))
let task = JSON.parse(localStorage.getItem('task')) || [] //если нет, то пустой массив
let nextTaskId;
//Переделайте проект, использовав localStorage для хранения данных
//---Рассказать про localStorage и Json,как очищать память, работа с обьектами
//реализовать хранение данных о выполненных задачах

let theme = localStorage.getItem('theme')
if (theme == "dark") {
    document.body.classList.add('dark-theme');
}

/*
inputTask.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addWork();
    }
});

*/
function showTaskInLocalStorage(){
    if (task.length>0){
        for(let i=0;i<task.length;i++){
            createElementWithWork(i+1,task[i].task)
        }
    }else{
        console.log('таск Пустой')

    }
    


}

showTaskInLocalStorage();

function addWorkWithInput(){
    

    const task = inputTask.value.trim();
    return task
}

function addWork() {
    
    

    //work = addWorkWithInput() //инпут
    work = prompt('введите задачу')

    //добавим проверку на пустоту
    if (work == "" || work == null) {
        alert('Введите задачу')
        return
    }
    let objTask = {
        task:work,
        flag:false
    }

    task.push(objTask)
    let index = task.length

    console.log(task)
    
    localStorage.setItem(`task`,JSON.stringify(task))
    
    createElementWithWork(index,work)

    
    

  
}
function createElementWithWork(numberWork,work){
        
    //создание элемента
    const liElem = document.createElement("li");
    liElem.setAttribute("id",numberWork)


    const spanElem = document.createElement("span");
    spanElem.textContent = numberWork + " " + work;
    if(task!==null){
        if (task[numberWork-1].flag){
        spanElem.classList.toggle("done")
    }

    }

    const buttonDel = document.createElement("button");
    buttonDel.textContent = "Удалить";


    
    //удаление
    buttonDel.addEventListener('click',function(){
      
       
        task.splice(numberWork-1,1)//удаляем из массива
        listUl.removeChild(liElem)
        
        localStorage.setItem('task',JSON.stringify(task));
        location.reload();
    })
    //Выполнение
    const buttonDon = document.createElement("button");
    buttonDon.textContent = "Выполнено";
    buttonDon.addEventListener('click',function(){
        //complElem(numberWork)
        spanElem.classList.toggle("done")
        task[numberWork-1].flag=!task[numberWork-1].flag //меняем флаг в массиве

        
       
        localStorage.setItem('task',JSON.stringify(task));  //обновляем массив в localStorage
        
        

        
    })


    
    liElem.appendChild(spanElem);
    liElem.appendChild(buttonDel);
    liElem.appendChild(buttonDon);
    listUl.appendChild(liElem);
    
}


function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    themeButton.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    theme = (theme === 'light' || theme == null) ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
   
}




// Функция для показа только выполненных задач
function showDoneTasks() {
    const allTasks = document.querySelectorAll('li');
    allTasks.forEach(task => {
        if (task.querySelector('.done')) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}


function showAllTasks() {
    const allTasks = document.querySelectorAll('li');
    allTasks.forEach(task => {
        task.style.display = 'flex';
    });
}

