const uploadImageButton = document.querySelector("#uploadImageButton");
const fileButton = document.querySelector("#fileButton");
const spinner = document.querySelector('#spinner');
const aData={}

fileButton.addEventListener("change", async(e) => {
    e.preventDefault();
    spinner.classList.remove('d-none');
    spinner.classList.add('d-inline-block');
    
    const signResponse = await fetch('/api/images/signature');
    const {signature,timestamp,apikey,cloudname} = await signResponse.json();

    const url = `https://api.cloudinary.com/v1_1/${cloudname}/image/upload?api_key=${apikey}&timestamp=${timestamp}&signature=${signature}`

    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();

    // Append parameters to the form data. The parameters that are signed using 
    // the signing function (signuploadform) need to match these.
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("file", file);
        formData.append("api_key", apikey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", "renegade");

        fetch(url, {
            method: "POST",
            body: formData
        })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data)
            aData.path = data.url;
            document.querySelector('#uploadedImg').setAttribute("src", data.url);
            spinner.classList.remove('d-inline-block');
            spinner.classList.add('d-none');
        });
    }
});

document.querySelector("#submitButton").addEventListener("click", (e)=>{
    e.preventDefault();
    aData.name = document.querySelector("#name").value;
    aData.description = document.querySelector("#description").value;
    if (!aData.path || !aData.name || ! aData.description){
        alert("Must include atleast an image, name, and description.");
        return;
    }
    fetch('/api/artpieces',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aData)
    }).then(response=>{
        if (response.ok){
            return response.json();
        }else{
            return null;
        }
    }).then(data=>{
        if (data){
            document.location.replace(`/artpiece/${data.id}`)
        }else{
            document.location.replace(`/login`)
        }
    }).catch(err=>{
        console.log(err);
        document.location.replace(`/home`)
    });
});