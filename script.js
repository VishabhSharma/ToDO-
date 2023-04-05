class Task{
    constructor(name,dueDate,workSpace,img,description,isComplete){
        this.name = name;
        this.dueDate = dueDate;
        this.workSpace = workSpace;
        this.img = img;
        this,description = description;
        this.isComplete = isComplete;
    }
}
class WorkSpace {
    constructor(name,arr){
        this.name = name;
        this.arr = arr;
    }
}

let workSpace = [new WorkSpace('Daily',[]),new WorkSpace('School',[]),new WorkSpace('Office',[])];


let completedTask = [];
let allTasks = [];
let dropTasks = [];

let workSpacesInputField = document.querySelector(".workSpacesInputField");
let stringInputFeild = "";

function render(){
    allTasks = [];


    let taskAddLocation = document.querySelector(".workSpaceMain");
    let mainUiString = "";
    let uiString = "<h2>Work-Spaces</h2>";
    let uiString2 = "";
    stringInputFeild = "";

    workSpace.forEach(element => {
    
        uiString += `<div class="space"><div class="heading"><img src="/static/pointer.svg" alt="."><h3 id = "toggle">${element.name}</h3></div><div class="noOfTask"><h5>You have ${element.arr.length} task in ${element.name}</h5></div>`
        uiString2 = `<ul id = "${element.name}" class = "visible">`
        stringInputFeild += `<option value="${element.name}">${element.name}</option>`;

        element.arr.forEach(e => {
            allTasks.push(e);
            uiString2 += `<li><div class="task"><div class="taskName"><h4>${e.name}</h4></div><div class="function"><img src="/static/done.svg"  alt="Done" id="${"1" + element.name + element.arr.indexOf(e)}" class = "hover2"><img src="/static/delete.svg" alt="" id="${"0" + element.name + element.arr.indexOf(e)}" class = "hover2"></div></div></li>`
        });

        uiString2 += "</ul>"
        uiString+= uiString2;
        uiString += `</div>`;
        mainUiString += uiString;
        uiString = "";

    });

    let doneTask = document.querySelector('.doneTask');
    doneTask.dataset.content = `${completedTask.length}`;

    let dropTask = document.querySelector('.dropTask');
    dropTask.dataset.content = `${dropTasks.length}`;


    workSpacesInputField.innerHTML = stringInputFeild;
    taskAddLocation.innerHTML = mainUiString;
}

render();
let toggleWorkSpace = document.querySelectorAll("#toggle");
toggleWorkSpace.forEach(element => {
    element.addEventListener("click",()=>{
        let uiEle = document.getElementById(element.innerHTML);
        if(uiEle.getAttribute("class") === "visible"){
            uiEle.setAttribute("class","hide");
        }else if(uiEle.getAttribute("class") === "hide"){
            uiEle.setAttribute("class","visible");
        }
    })
});

window.addEventListener("click",(e)=>{
    let id = e.target.id;
    let parentId;
    let refID = id[id.length-1]
    workSpace.forEach(element => {
        if(element.name == id.substring(1,id.length-1)){
            parentId = workSpace.indexOf(element);
        }
    });

    if(id[0] == 0){
        dropTasks.push(workSpace[parentId].arr[refID]);
        workSpace[parentId].arr.splice(refID,1);
        render();
    }else if(id[0] == 1){
        completedTask.push(workSpace[parentId].arr[refID]);
        workSpace[parentId].arr.splice(refID,1);
        render();
    }
})



//leftSide

let currentTask = 0;

let nextTask = document.getElementById("nextTask");
let prevTask = document.getElementById("prevTask");

nextTask.addEventListener("click",()=>{

    if(allTasks.length === 0){
        currentTask = -1;
    }else if(currentTask+1 >= allTasks.length){
        currentTask = 0;
    }else{
        currentTask++;
    }
    renderLeft(currentTask);
})

prevTask.addEventListener("click",()=>{
    if(allTasks.length === 0){
        currentTask = -1;
    }else if(currentTask-1 <= 0){
        currentTask = allTasks.length-1;
    }else{
        currentTask--;
    }
    renderLeft(currentTask);
})

function renderLeft(id){

    let imgDiv = document.querySelector(".imgDiv");
    imgDiv.innerHTML = `<img src="/static/img/programming/${allTasks[id].img}.svg" alt="">`;

    let taskDetail = document.querySelector(".taskDetail");
    let taskNameString = allTasks[id].name;
    if(taskNameString.length >= 9){
        taskNameString = taskNameString.substring(0,8);
    }
    taskDetail.innerHTML = `<h2>${taskNameString}</h2><h4>${allTasks[id].workSpace}</h4>`;
    
}






//addNewTask
let newTaskImgDiv = document.querySelector(".newTaskImgDiv");
let cancel = document.getElementById("cancel");
let addNewTask = document.getElementById("addThisTask");
let rough = document.querySelector(".roughSection");
let addNewTaskBtn = document.getElementById("addNewTaskBtn");

addNewTaskBtn.addEventListener("click",()=>{
    let random = Math.floor(Math.random()*5);
    let imgName=["checklist.svg","concept-of-to-do-list.png","schedule-planning.svg","tasklist.svg","to-do-list.svg"];
    newTaskImgDiv.innerHTML = `<img src="/static/img/${imgName[random]}" alt="">`
    rough.setAttribute("class","visible");
})

cancel.addEventListener("click",()=>{
    rough.setAttribute("class","hide");
})

addThisTask.addEventListener("click",()=>{

    let name = document.getElementById("newTaskworkName").value;
    let date = document.getElementById("newTaskDate").value;
    let img = document.getElementById("newTaskImg").value;
    let space = document.getElementById("newTaskworkSpace").value;
    let description = document.getElementById("newTaskDescription").value;
    
    workSpace.forEach(element => {
        if(element.name == space){
            element.arr.push(new Task(name,date,space,img,description,false));
        }
    });

    render();
    renderLeft(0);

    rough.setAttribute("class","hide");
})

let workSpaceToggle = document.querySelector(".workSpaceToggle");
let toggleNav = 0;
workSpaceToggle.addEventListener("click",()=>{
    if(toggleNav == 0){
        document.getElementById("workSpace").setAttribute("style","left: 0%;")
        if(window.innerWidth > 330){
            workSpaceToggle.setAttribute("style","top: 10%; left: 280px;");
        }else{
            workSpaceToggle.setAttribute("style","top: 10%; left: 240px; background-color:var(--asent1)");
        }
        workSpaceToggle.innerHTML = `<img src="/static/cross.svg" alt="">`
        toggleNav++;
    }else{
        document.getElementById("workSpace").setAttribute("style","left: -150%;")
        workSpaceToggle.setAttribute("style","top: 50%; left: -1%;");
        workSpaceToggle.innerHTML = `<img src="/static/menu.svg" alt="">`
        toggleNav = 0;
    }
    
})