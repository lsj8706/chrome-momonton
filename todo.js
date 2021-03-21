const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";  

let toDos = [];

let idNumbers = 1;


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        //필터링을 해서 toDos에 아래의 리턴값을 해당하는것만 남기는 기법이 .filter(function)
        //예를들어 li.id 가 2인 li를 지웠을때 filter하면 li.id가 2가 아닌 toDo들만 toDos에 남게됨
        //이렇게 걸러져서 만들어진 toDos가 cleanToDos라는 이름으로 저장되는 코드이다.
        return toDo.id !==parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumbers;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    idNumbers +=1;
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
        parsedToDos.forEach(function(toDo){
            //이 function은 무명함수.
            paintToDo(toDo.text);
        })
      
    }
}



function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}

init();