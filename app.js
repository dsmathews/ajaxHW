const stockList = ['DIS', 'GOOG', 'AAPL','SSNLF'];

const render = function () {
    $('#stockButtons').empty();

    for (let i = 0; i < stockList.length; i++) {
        let newButton = $('<button>');
        newButton.addClass('wookie');
        newButton.attr('data-name', stockList[i]);
        newButton.text(stockList[i]);
        $('#stockButtons').append(newButton);
    }
};

const addButton = function(event) {
    event.preventDefault();
    const stock =$('#stock-input').val().trim();
    stockList.push(stock);
    $('#stock-input').val('');
    render();
};

// const validate = function () {
//     event.preventDefault();
//     const stock = $('#stock-input').val().trim();
//     const queryURL = `https://api.iextrading.com/1.0/ref-data/symbols#`;
//     $.ajax({
//         url:queryURL,
//         method: 'GET'
//     }).then(function(response){
//         $('#stock-input').text(JSON.stringify(response));
//     });

//     // if (response.symbol !== stock) {
//     //     $('#add-stock').hide();
//     // }
//     // else {
//     //     $('#add-stock').show();
//     // }
//     console.log(queryURL);

// };

// $('#stock-input').on('keypress', validate);
$('#add-stock').on('click', addButton);
render();

