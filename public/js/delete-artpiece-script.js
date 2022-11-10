const removeBtn = document.querySelector(".removeBtn");

removeBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const artId = e.target.getAttribute('artPId');

    fetch('/api/artpieces/:id',{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        id:artId
    }).then(response=>{
        console.log(response);
        response.json();
    }).then(data=>{
        console.log(data);
    })
});