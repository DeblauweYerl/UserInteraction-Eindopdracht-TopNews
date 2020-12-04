let categories = {'business':0, 'entertainment':0, 'health':0, 'science':0, 'sports':0, 'technology':0, 'politics':0};
let categoryValues = [];
let html_data, innerHTMLdata;

let customHeaders = new Headers();

let getAPIs = async function(){
    // let url;
    for (var category in categories) {
        // url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=cc26c03f571849f18a51b99646a7982c`;
        await fetchFunction(url, category);
    }
    showResults();
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
	};
};

let processData = function(data, category) {
    categories[category] = data.totalResults;
    categoryValues.push(data.totalResults);
};

let showResults = function(){
    const categories_sorted = sortDict(categories);
    let max = Math.max(...categoryValues);
    console.log(categories_sorted);
    html_data.innerHTML = "";
    innerHTMLdata = "";
    console.log(`max= ${max}`);
    for (var category of categories_sorted) {
        console.log(`categoryKeyValue = ${category[0]} - ${category[1]}`);
        innerHTMLdata += 
        `<button style="width: ${category[1]/max*100}%;" class="o-button-reset o-layout o-layout--align-center-bp1 c-data__item">
            <span class="c-data__name">${category[0]}</span>
            <svg class="c-arrow"><use xlink:href="#arrow"></use></svg>
            <p class="c-data__meta">Total top articles found: ${category[1]}</p>
        </button>`;
    };
    html_data.innerHTML += innerHTMLdata;
};

let sortDict = function(dict) {
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
      });
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    return items;
}

document.addEventListener('DOMContentLoaded', function() {
    html_data = document.querySelector('.js-data');
    
    getAPIs();
});