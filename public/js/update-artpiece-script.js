document.querySelector("#submitButton").addEventListener("click", (e)=>{
    e.preventDefault();
    let aData ={};
    aData.name = document.querySelector("#name").value;
    aData.description = document.querySelector("#description").value;
    aData.keywords = document.querySelector("#add-art-keywords").value.split(' ');
    const id = e.target.getAttribute("data-id");

    if (!aData.name || ! aData.description || !aData.keywords){
        Alert("Must include a name, description, and keywords");
        return;
    }
    fetch(`/api/artpieces/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aData)
    }).then(response=>{
        console.log(response)
        if (response.ok){
            return response.json();
        }else{
            return null;
        }
    }).then(data=>{
        if (data){
            document.location.replace(`/artpiece/${id}`)
        }else{
            console.log(data);
            //document.location.replace(`/login`)
        }
    }).catch(err=>{
        console.log(err);
        //document.location.replace(`/home`)
    });
});