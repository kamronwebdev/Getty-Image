const key = "563492ad6f91700001000001d6605cd8b33f45838e4cf1e6dfa408f9"


const rasm = document.querySelector(".gallery");
const inputIzlash = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let fetchLink; 
let searchValue;
let page = 1;
const more = document.querySelector(".more");
let currentSearch;


inputIzlash.addEventListener("input", updateInput);
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})
more.addEventListener("click", loadMore);

function updateInput(e){
    searchValue = e.target.value;
}


//APIni ulab olamiz
async function fetchApi(url){
    const dataFetch = await fetch(url,{
    method :"Get",
    headers:{
        Accept:"application/json",
        Authorization:key,

    },
    });
    const data = await dataFetch.json();
    return data;
}

//PhotoCard Yasaymiz
function generatePictures(data){
data.photos.forEach(photo => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
     
        <div class="gallery-info">
            <p><i class="fa-solid fa-user"></i> ${photo.photographer}</p>
            <a href=" ${photo.src.large}" target="_blank"><i class="fa-solid fa-circle-down"> </i> Download</a>
        </div>
        <div class="img-content">
            <a href=" ${photo.src.large}" target="_blank"><img src="${photo.src.large}"></img></a>
        </div>

    `;
    
    rasm.appendChild(galleryImg);
});
}

//Rasmlarni Jsonda qabul qilib olamiz
async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}
curatedPhotos();

//rasmlarni tozalash
function clear(){
    rasm.innerHTML = "";
    inputIzlash.innerHTML = "";
}

//Rasmni izlash funksiyasi 
async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}
//More buttonni yasaymiz
    async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
       
    }else{
        fetchLink =`https://api.pexels.com/v1/curated?per_page=15&page=${page}`; 
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}


