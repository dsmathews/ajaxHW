const stockList = ['DIS', 'GOOG', 'AAPL','TSLA','AMZN'];

const render = function () {
    $('#stockButtons').empty();

    for (let i = 0; i < stockList.length; i++) {
        let newButton = $('<button>');
        newButton.addClass('stockInfo btn btn-warning mt-1 ml-1');
        newButton.attr('data-name', stockList[i]);
        newButton.text(stockList[i]);
        $('#stockButtons').append(newButton);
    }

    $('.infoRender').empty();
    $('#newsLine').empty();
};


// validation list for input field
const validationList = [];
$.ajax({
    url: `https://api.iextrading.com/1.0/ref-data/symbols#`,
    method: 'GET'
}).then(function (response) {
    response.forEach(function (element) {
        validationList.push(element.symbol);
        // console.log(validationList);
    });
});




// adding a button
const addButton = function (event) {
    event.preventDefault();
    const newName = $('#stock-input').val().trim().toUpperCase();
    console.log("I'm listening");
    if (validationList.indexOf(newName) >= 0 && !stockList.includes(newName)) {
        // alert("Please enter a valid stock symbol");
        console.log("I'm working");
        stockList.push(newName);
        $('#stock-input').val('');
        render();
    }
    else {
        $('#add-stock').attr('disabled');
        console.log("I'm still listening");
    }

};

// searching stock api query
const stockSearch = function () {
    $('.infoRender').empty();
    $('#newsLine').empty();
    const stock = $(this).attr('data-name');
    const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news,logo,company`;
    console.log(response);
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);

        // boxes for the specific data needed from JSON file
        const compName = response.quote.companyName;
        const compLogo = response.logo.url;
        const boss = response.company.CEO;
        const stockPrice = response.quote.latestPrice;
        const calculatedChange = response.quote.change;
        const stockSymbol = response.quote.symbol;
        const tell = response.company.description;
        const compLink = response.company.website;
        // console.log(compName);
        // console.log(compLogo);
        // console.log(stockPrice);
        // console.log(stockSymbol);
        console.log(boss);

        // add general area to place information
        const infoBody = $('<div>');
        infoBody.addClass('card-body');

        // add specific box areas to general box area
        
        const namePlate = $('<h4>').text(`${compName}`);
        const logoPortrait = $(`<img src = "${compLogo}">`);
        const priceHolder = $('<p>').text(`Stock Price: $${stockPrice}`);
        const changeHolder = $('<p>').text(`Change: ${calculatedChange}`);
        const symbolHolder = $('<p>').text(`Stock Symbol: ${stockSymbol}`);
        const bossPlate = $('h2').text(`${boss}, CEO`);
        const description = $('<p>').text(`${tell}`);
        const compWeb =$(`<a href= "${compLink} target="_blank"> <p>Company Website</p> </a>`);
        $('.infoRender').append(logoPortrait,namePlate,bossPlate,priceHolder,changeHolder,symbolHolder,description,compWeb);

        // creating boxes for the news material
        const newsContent = $('<div>');
        newsContent.addClass('card-body');

        // news variable
            const stockNews = response.news;

        // news headlines and url
            for (let i = 0; i < stockNews.length; i++) {
            const newsHead = stockNews[i].headline;
            const newsSource = stockNews[i].source;
            const newsHTML = stockNews[i].url;
            const newsbit = stockNews[i].summary; 
            console.log(newsHead);
            console.log(newsSource);
            console.log(newsHTML);
            console.log(newsbit);
            newsContent.append(`<p> <a href = "${newsHTML}" target="_blank"> ${newsHead} </a> </p>`);
            newsContent.append(`<p>${newsSource}</p><p>${newsbit}</p?`);
            }
            $('#newsLine').append(newsContent);
    });
};


// clear button function
const clear = function () {
    $('.infoRender').empty();
    $('#newsLine').empty();
};

// events
$('#stockButtons').on('click', '.stockInfo', stockSearch);
$('#add-stock').on('click', addButton);
$('#clear-out').on('click', clear);
render();