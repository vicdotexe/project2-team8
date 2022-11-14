document.querySelector("#watchButton").addEventListener("click", (e)=>{
    const userId = e.target.getAttribute("data-id");
    console.log(userId);
    fetch(`/api/follow/toggle/${userId}`, {
        method: 'PUT'
    }).then(response=>{
        if (response.ok){
            document.location.reload()
        }else{
            document.location.href = '/signin'
        }
    })
})