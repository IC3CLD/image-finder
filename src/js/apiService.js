import refs from "./refs";

const Api_key = "18623530-8c7b2263c3cd9ccd5c714d467";
const baseUrl = "https://pixabay.com/api/";
// let query = `JS`;
// let page = 1;
// let perPage = 12;
// const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${perPage}&key=${Api_key}`;

export default {
    _query: 'money', 
    page: 1,
    perPage: 12,
    
  async fetchImages() {
      let url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this._query}&page=${this.page}&per_page=${this.perPage}&key=${Api_key}`;
      try{
          const res = await fetch(url);
          const getResponse = res.json();
          return getResponse
      }
      catch(error){
          throw displayError(error)
      }
    },
    setPage(){
        return this.page++;
    },
    set query(newQuery){
        this._query = newQuery;
    },
    get query(){
        return this._query;
    },
    

}
        function displayError(error) {
             const errorH2 = document.createElement(`h2`);
             errorH2.textContent = error;
             refs.body.insertAdjacentElement(`afterbegin`, errorH2)
        }