document.querySelector("#submitCommentButton").addEventListener("click", (e)=>{
    e.preventDefault();
    const textContent = document.querySelector("#commentInput").value;
    if (!textContent){
        return;
    }
    const artId = e.target.getAttribute('artId');
    const body = JSON.stringify({
        content: textContent,
        artId: artId
    });
    fetch('/api/comments',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:body
    }).then(response=>{
        console.log(response);
        if (response.ok){
            document.location.reload();
        }else{
            document.location.replace('/signin')
        }
        response.json();
    }).then(data=>{
        console.log(data);
    })
});