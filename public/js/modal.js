const alert = document.querySelector('#alert');
const closealertButton = document.querySelector('#alertClose');
const alertContent = document.querySelector('#alertContent')
let alertCallback;

closealertButton.addEventListener("click", (e)=>{
    alert.classList.add("hidden");
    if (alertCallback){
        alertCallback();
        alertCallback = null;
    }
})

function Alert(content, callback){
    alertContent.innerHTML = ""
    alertCallback = callback;
    if (typeof(content) === 'string' || content instanceof (String)){
        let p = document.createElement('p');
        p.innerText = content;
        alertContent.appendChild(p);
    }else{
        alertContent.appendChild(content);
    }
    alert.classList.remove("hidden");
}

const confirm = document.querySelector('#confirm');
const yesconfirmButton = document.querySelector('#confirmYes');
const noconfirmButton = document.querySelector("#confirmNo")
const confirmContent = document.querySelector('#confirmContent')
let callbackYes, callbackNo;

yesconfirmButton.addEventListener("click", (e)=>{
    confirm.classList.add("hidden");
    if (callbackYes){
        callbackYes();
        callbackYes = null;
    }
})

noconfirmButton.addEventListener("click", (e)=>{
    confirm.classList.add("hidden");
    if (callbackNo){
        callbackNo();
        callbackNo = null;
    }
})


function Confirm(content, onYes,onNo){
    callbackYes = onYes;
    callbackNo = onNo;
    confirmContent.innerHTML = ""

    if (typeof(content) === 'string' || content instanceof (String)){
        let p = document.createElement('p');
        p.innerText = content;
        confirmContent.appendChild(p);
    }else{
        confirmContent.appendChild(content);
    }
    confirm.classList.remove("hidden");
}