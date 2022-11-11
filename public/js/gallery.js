const galleryItems = document.querySelectorAll(".galleryItem");
const stars = document.querySelectorAll(".galleryItem");

galleryItems.forEach(item=> item.addEventListener("click", (e)=>{

    if (e.target.classList.contains("star")){
        const id = e.target.getAttribute('data-id');
        const isLiked = e.target.getAttribute('data-liked') == "true";
        if (isLiked){
            unlike(id);
        }else{
            like(id);
        }
    }else{
        const id = item.getAttribute('data-id');
        document.location.href=`/artpiece/${id}`;
    }
}))

const unlike = (id)=>{
    fetch('/api/likes',{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ArtPieceId:id})
    }).then(response=>{
        if (response.ok){
            document.location.reload();
        }else{
            document.location.href = '/signin';
        }
    })
}

const like = (id)=>{
    fetch('/api/likes',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ArtPieceId:id})
    }).then(response=>{
        if (response.ok){
            document.location.reload();
        }else{
            document.location.href = '/signin';
        }
    })
}