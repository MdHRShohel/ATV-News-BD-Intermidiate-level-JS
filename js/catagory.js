const loadCatagories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCatagories(data.data.news_category);
}
const displayCatagories = catagories => {
    const catagoryContainer = document.getElementById('catagory-container');
    catagories.forEach(catagory => {
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick="newsLoad('${catagory.category_id}')" type="button" class="btn btn-light">${catagory.category_name}</button>
    
        `;
        catagoryContainer.appendChild(div);
    })
}



const newsLoad = category_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
}

const displayNews=catagories=>{
    const newsContainer = document.getElementById('news-container');
     newsContainer.innerHTML = '';
    catagories.forEach(category => {
        const createSingleNews = document.createElement('div');
        createSingleNews.classList.add('single-news');
        createSingleNews.innerHTML = `
              <div class="row g-0 m-3 rounded">
                 <div class="col-md-3">
                    <img src="${category.image_url}" class="img-fluid rounded" alt="...">
                 </div>
                 <div class="col-md-9 ">
                     <div class="card-body">
                        <h3 class="card-title fw-bold">${category ? category.title : 'No Data Found'}</h3>
                        <p class="card-text">${category.details.slice(0, 1000)}</p>
         
                      </div>
                  <div class="card-bottom d-flex align-items-center justify-content-between">
                          <div class="d-flex ">
                                  <img src="${category.author.img}" alt="">
                                  <div class="author">
                                      <h6>${category.author ? category.author.name : 'No Data Found'}</h6>
                                      <p>${category.author ? category.author.published_date : 'No Data Found'} </p>
                                  </div>
                          </div>
         
                          <div>
                                  <h5><i class="fa-regular fa-eye"></i> ${category.total_view}</h5>
                          </div>
                          <div>
                                   <i class="fa-solid fa-star-half-stroke"></i>
                                   <i class="fa-regular fa-star"></i>
                                   <i class="fa-regular fa-star"></i>
                                   <i class="fa-regular fa-star"></i>
                                   <i class="fa-regular fa-star"></i>
                                   
                          </div>
         
                         <div>
                          <button onclick="loadDetails('${category._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal"><i class="fa-solid fa-arrow-right"></i></button>
                          
                         </div>
         
                  </div>
              </div>
         
              `;
        newsContainer.appendChild(createSingleNews);
    })
}
const loadDetails = async _id => {

    const url = `https://openapi.programming-hero.com/api/news/${_id}`;
    //console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);
}


const displayNewsDetails = categories => {

    categories.forEach(category => {

        console.log(category)
        const newsTitle = document.getElementById('newsDetailModalLabel');
        newsTitle.innerText = category.title;
        const newsDetails = document.getElementById('news-details');
        newsDetails.innerHTML = `
        <img src=${category.image_url} class="mb-3 w-100"/>
        <h3>${category.title}</h3>
        <p>${category.details}</p>
       

        <div class="card-bottom d-flex align-items-center justify-content-between">
                  <div class="d-flex ">
                          <img src="${category.author.img}" alt="">
                          <div class="author">
                              <h6>${category.author ? category.author.name : 'No Data Found'}</h6>
                              <p>${category.author ? category.author.published_date : 'No Data Fpund'} </p>
                          </div>
                  </div>
 
                  <div>
                          <h5><i class="fa-regular fa-eye"></i> ${category.total_view}</h5>
                  </div>
                  <div>
                           <i class="fa-solid fa-star-half-stroke"></i>
                           <i class="fa-regular fa-star"></i>
                           <i class="fa-regular fa-star"></i>
                           <i class="fa-regular fa-star"></i>
                           <i class="fa-regular fa-star"></i>
                           
                  </div>
          </div>   
    `;
    })
}
loadCatagories();