import refs from "./refs";
import apiService from "./apiService";
import template from "../template/template.hbs";
import debounce from "lodash.debounce";
import * as basicLightbox from "basiclightbox";
import "../../node_modules/basiclightbox/dist/basiclightbox.min.css";
import "@babel/polyfill"

refs.galleryList.addEventListener(`click`, (event) => {
  if (event.target.nodeName === "IMG") {
    let targetImgSrc = event.target.dataset.source;
    const instance = basicLightbox.create(`  
        <div class="modal">
        <button class="js-modal-btn"></button>
            <img src="${targetImgSrc}">
        </div>
    `);

    instance.show();
  }

  let ModalImg = document.querySelector(".js-modal-img");
});

refs.input.addEventListener(
  "input",
  debounce((event) => {
    event.preventDefault;
    apiService.query = event.target.value;
    renderApi();
    refs.input.value = "";
    refs.galleryList.innerHTML = "";
  }, 500),
);

function renderApi() {
  apiService.fetchImages().then(({ hits }) => renderImages(hits));
}
const loadMoreBtn = document.createElement(`button`);
loadMoreBtn.textContent = "Load more...";
loadMoreBtn.classList.add("loadmore-button");

function renderImages(data) {
  const items = template(data);
  refs.galleryList.insertAdjacentHTML("beforeend", items);

  if (refs.galleryList.children.length > 0) {
    refs.body.insertAdjacentElement("beforeend", loadMoreBtn);
    loadMoreBtn.classList.remove("hiden");
  } else {
    loadMoreBtn.classList.add("hidden");
  }
}

loadMoreBtn.addEventListener(`click`, loadMore);

function loadMore() {
  apiService.setPage();
  apiService.fetchImages().then(({ hits }) => renderImages(hits));
  console.log(document.documentElement.offsetHeight);
  setTimeout(() => {
    window.scrollTo({
      top: document.documentElement.offsetHeight - 1900,
      behavior: "smooth",
    });
  }, 500);
}
// console.log(window.innerHeight);

// console.log(document.documentElement.offsetHeight);
