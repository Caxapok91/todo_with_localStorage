const listUl = document.getElementById("listWork");
const themeButton = document.getElementById("themeButton");
const inputTask = document.getElementById('input-text');
let data = JSON.parse(localStorage.getItem('work'))
let nextTaskId;
//Переделайте проект, использовав localStorage для хранения данных
//---Рассказать про localStorage и Json,как очищать память, работа с обьектами
//реализовать хранение данных о выполненных задачах



/*
inputTask.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addWork();
    }
});

*/
function showTaskInLocalStorage(){
       
    
    if (data===null || Object.keys(data).length==0) {
        console.log('Пустой')
        data={}
        nextTaskId=0;
    }
    else{
        for(key in data){

            createElementWithWork(key,data[key].task)
            nextTaskId=key;
        }
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
    if (work == "") {
        alert('Введите задачу')
        return
    }
    let objTask = {
        task:work,
        flag:false
    }
    nextTaskId++;
    data[nextTaskId]=objTask;

    console.log(data)
    localStorage.setItem(`work`,JSON.stringify(data))
    
    createElementWithWork(nextTaskId,work)

    
    

  
}
function createElementWithWork(numberWork,work){
        
    //создание элемента
    const liElem = document.createElement("li");
    liElem.setAttribute("id",numberWork)


    const spanElem = document.createElement("span");
    spanElem.textContent = numberWork + " " + work;
    if(data!==null){
        if (data[numberWork].flag){
        spanElem.classList.toggle("done")
    }

    }

    const buttonDel = document.createElement("button");
    buttonDel.textContent = "Удалить";


    
    //удаление
    buttonDel.addEventListener('click',function(){
      
        delete data[numberWork]
        listUl.removeChild(liElem)
        localStorage.setItem('work',JSON.stringify(data));

    })
    //Выполнение
    const buttonDon = document.createElement("button");
    buttonDon.textContent = "Выполнено";
    buttonDon.addEventListener('click',function(){
        //complElem(numberWork)
        spanElem.classList.toggle("done")
        data[numberWork].flag = true
        localStorage.setItem('work',JSON.stringify(data));

        
    })


    
    liElem.appendChild(spanElem);
    liElem.appendChild(buttonDel);
    liElem.appendChild(buttonDon);
    listUl.appendChild(liElem);
    
}


function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    themeButton.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
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

