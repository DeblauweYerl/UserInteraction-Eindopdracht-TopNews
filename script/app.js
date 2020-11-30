let categories = {'business':0, 'entertainment':0, 'health':0, 'science':0, 'sports':0, 'technology':0, 'politics':0};
let categoryValues = [];
let html_data, innerHTMLdata;

let customHeaders = new Headers();

let processData = function(data, category) {
    categories[category] = data.totalResults;
    categoryValues.push(data.totalResults);
}

let showResults = function(data){
    let max = categoryValues.max;
    innerHTMLdata = "";
    innerHTMLdata += 
    `<button style="width: ${data.value/max*100}%;" class="o-button-reset o-layout o-layout--align-center-bp1 c-data__item">
        <span class="c-data__name">${data.key}</span>
        <p class="c-data__meta">Total top articles found: ${data.value}</p>
        <svg class="c-arrow"><use xlink:href="#arrow"></use></svg>
    </button>`;
    html_data.innerHTML += innerHTMLdata;
}

let getAPIs = async function(){
    // html_data.innerHTML = "";
    // for (i = 0; i < categories.length; i++) {
    //     let url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=cc26c03f571849f18a51b99646a7982c`;
    //     if (categories.indexOf(category) != categories.length-1) { 
    //         fetchFunction(url, category);
    //     }
    //     else {
    //         await fetchFunction(url, categories[i].key);
    //     }
    // }
    let url;
    for (var category in categories) {
        url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=cc26c03f571849f18a51b99646a7982c`;
        await fetchFunction(url, category);
        showResults();
    }
};

const fetchFunction = async function(url, category) {
	try {
        const response = await fetch(url, { headers: customHeaders });
		const data = await response.json();
		console.log(data);
		// Als dat gelukt is, gaan we naar onze showResult functie.
		processData(data, category);
	}
	catch (error) {
		console.error("An error occured: ", error);
	}
}

document.addEventListener('DOMContentLoaded', function() {
    html_data = document.querySelector('.js-data');
    
    getAPIs();
});