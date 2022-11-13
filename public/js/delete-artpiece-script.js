const removeBtns = document.querySelectorAll(".removeBtn");

removeBtns.forEach(removeBtn => {
    removeBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        const artId = e.target.getAttribute('artPId');
    
        let yes = ()=>{
            fetch(`/api/artpieces/${artId}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                },
            }).then(response=>{
                if(response.ok){
                    document.location.reload();
                }
                response.json();
            }).then(data=>{
                console.log(data);
            })
        }
        Confirm("Are you sure?", yes)

    });
});
