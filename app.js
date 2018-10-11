const stockList = ['DIS', 'GOOG', 'AAPL'];

const render = function () {
    $('#stockButtons').empty();

    for (let i = 0; i < stockList.length; i++) {
        let newButton = $('<button>');
        newButton.addClass('stockInfo');
        newButton.attr('data-name', stockList[i]);
        newButton.text(stockList[i]);
        $('#stockButtons').append(newButton);
    }

    $('infoRender').empty();
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
    $('.infoRender').append(namePlate,logoPortrait,priceHolder,symbolHolder);
};

// searching stock api query
const stockSearch = function () {
    $('.infoRender').empty();
    const stock = $(this).attr('data-name');
    console.log(stock);
    $.ajax({
        url: `https:api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news,logo&range=1m&last=10`,
        method: 'GET'
    }).then(function (response) {
        console.log(response);

        // boxes for the specific data needed from JSON file
        const compName = response.quote.companyName;
        const compLogo = response.logo.url;
        const stockPrice = response.quote.latestPrice;
        const stockSymbol = response.quote.symbol; 
        console.log(compName);
        console.log(compLogo);
        console.log(stockPrice);
        console.log(stockSymbol);

        // add general area to place information
        const infoArea = $('<div>');
        infoArea.addClass('card');
        const infoBody = $('<div>');
        infoBody.addClass('card-body');

        // add specific box areas to general box area
        
        const namePlate = $('<h2>').text(`Company Name: ${compName}`);
        const logoPortrait = $(`<img src = "${compLogo}">`);
        const priceHolder = $('<p>').text(`Stock Price: $${stockPrice}`);
        const symbolHolder = $('<p>').text(`Stock Symbol: ${stockSymbol}`);
        $('.infoRender').append(namePlate,logoPortrait,priceHolder,symbolHolder);
    });
};


// clear button function
const clear = function () {
    $('.infoRender').empty();
};

// events
$('#stockButtons').on('click', '.stockInfo', stockSearch);
$('#add-stock').on('click', addButton);
$('#clear-out').on('click', clear);
render();