const likeButton = document.querySelector('#likeButton')

likeButton.addEventListener("click", (e)=>{
    e.preventDefault();
    const id = e.target.getAttribute('data-artId');
    const isLiked = e.target.getAttribute('data-liked') == "true";
    if (isLiked){
        like(id);
    }else{
        unlike(id);
    }
    
})

const like = (id)=>{
    fetch('/api/likes',{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ArtPieceId:id})
    }).then(response=>{
        if (response.ok){
            document.location.reload();
        }
    })
}

const unlike = (id)=>{
    fetch('/api/likes',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ArtPieceId:id})
    }).then(response=>{
        if (response.ok){
            document.location.reload();
        }
    })
}