import refs from "./refs";
import apiService from "./apiService";
import template from "../template/template.hbs";
import debounce from "lodash.debounce"

// console.log(refs);

// console.log(apiService.fetchImages());

refs.input.addEventListener(
    'input',
    debounce(event => {
        event.preventDefault;
        apiService.query = event.target.value;      
        renderApi();
        refs.input.value = '';
    }, 500),
  );

function renderApi(){
    apiService.fetchImages().then(({hits}) => renderImages(hits));
}
const loadMoreBtn = document.createElement(`button`);
loadMoreBtn.textContent = "Load more...";
loadMoreBtn.classList.add("loadmore-button");

function renderImages(data){
    const items = template(data);
    refs.galleryList.insertAdjacentHTML('beforeend', items);

    if(refs.galleryList.children.length > 0){
        refs.body.insertAdjacentElement('beforeend', loadMoreBtn);
        loadMoreBtn.classList.remove('hiden')
    }else{loadMoreBtn.classList.add('hidden')}
};

loadMoreBtn.addEventListener(`click`, loadMore);

function loadMore(){
    apiService.setPage();
    apiService.fetchImages().then(({hits}) => renderImages(hits));
}


