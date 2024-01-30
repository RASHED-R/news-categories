// Replace 'https://api.example.com/data' with the actual API endpoint
const apiUrl = 'https://openapi.programming-hero.com/api/news/categories';


// Using async/await with try/catch
async function handleLoadCategories() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data fetched successfully');
        const categories = data.data.news_category;

        const tabContainer = document.getElementById('tab-container');

        categories.forEach(category => {
            const div = document.createElement('div');
            div.innerHTML = `
            
            <a onclick = "handleNewsId('${category.category_id}')" role="tab" class="tab">${category?.category_name}</a>
            `
            tabContainer.appendChild(div);
        });

    } catch (error) {
        console.error('Error fetching data:', error.message);
    }

}

const handleNewsId = async (newsId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${newsId}`);
    const data = await res.json();
    const newsDataCategories = data.data;
    const newsCardContainer = document.getElementById('news-card-container');
    newsCardContainer.innerHTML = "";
    const eH3 = document.createElement('h3');


    newsDataCategories?.forEach(newsDataCategory => {
        console.log(newsDataCategory);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
            <figure><img src= ${newsDataCategory?.image_url} alt="Shoes" /></figure>
            <div class="card-body relative">
                <h2 class="card-title">
                ${newsDataCategory?.title.slice(0, 40)}
                <div class="badge badge-secondary absolute top-0 right-0"> ${newsDataCategory?.rating?.badge}</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                <div class="badge badge-outline">Fashion</div>
                <div class="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
        `
        newsCardContainer.appendChild(div);
    });
    if (newsDataCategories.length == 0) {
        console.log(newsDataCategories);

        eH3.innerHTML = "no data found"
        newsCardContainer.appendChild(eH3);
    }

}


// Call the function to fetch data
handleLoadCategories();
