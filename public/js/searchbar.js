const searchButton = document.querySelector("#searchButton");
const searchInput = document.querySelector("#searchInput");

searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    const input = searchInput.value;
    const keywords = `keywords=${input.replace(' ','+')}`
    document.location.href = '/search?'+keywords;
})