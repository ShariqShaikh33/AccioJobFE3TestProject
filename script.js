
function renderElement(data){
    data.map((item)=>{
        table.innerHTML+=`<tr class="tablerow" id=${item.id}>
                        <td class="tablecell">
                            <table>
                                <tr>
                                    <td><img class="logo"  src=${item.image}></td>
                                    <td>${item.name}</td>
                                </tr>
                            </table></td>
                        <td class="tablecell">${item.symbol}</td>
                        <td class="tablecell">$ ${item.current_price}</td>
                        <td class="tablecell">$ ${item.total_volume}</td>
                        <td id="${item.id}percentage" class="tablecell">${item.price_change_percentage_24h}%</td>
                        <td class="tablecell">Mkt Cap : $ ${item.market_cap}</td>`
    })
    data.forEach(element => {
        if(element.price_change_percentage_24h>=0){
            document.getElementById(`${element.id}`+"percentage").classList.add("greencell");
        }
        else if(element.price_change_percentage_24h<0){
            document.getElementById(`${element.id}`+"percentage").classList.add("redcell");
        }
    });
}


async function getData(){
    let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
    let data = await response.json();
    return (data);
}


// [{"id":"bitcoin",
// "symbol":"btc",
// "name":"Bitcoin",
// "image":"https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
// "current_price":97943,
// "market_cap":1937905749797,
// "market_cap_rank":1,
// "fully_diluted_valuation":2054729032279,
// "total_volume":19295739047,
// "high_24h":98695,
// "low_24h":97577,
// "price_change_24h":122.0,
// "price_change_percentage_24h":0.12471,
// "market_cap_change_24h":1504793923,
// "market_cap_change_percentage_24h":0.07771,
// "circulating_supply":19806028.0,
// "total_supply":21000000.0,
// "max_supply":21000000.0,
// "ath":108135,
// "ath_change_percentage":-9.47239,
// "ath_date":"2024-12-17T15:02:41.429Z",
// "atl":67.81,
// "atl_change_percentage":144263.96938,
// "atl_date":"2013-07-06T00:00:00.000Z",
// "roi":null,
// "last_updated":"2025-01-05T13:29:30.606Z"},

let table = document.getElementById("table");

getData().then((data)=>{
    renderElement(data);
});

function sortMtkCap(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            const value1 = arr[j].market_cap;
            const value2 = arr[j + 1].market_cap;
            if (value1 > value2) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return (arr);
}

let marketCapbtn = document.getElementById("MCbtn");
marketCapbtn.addEventListener('click', ()=> {
    getData().then((data)=>{
        return sortMtkCap(data);
    }).then((res)=>{
        table.innerHTML="";
        renderElement(res);
    })
}
);


function sortPerc(arr){
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            const value1 = arr[j].price_change_percentage_24h;
            const value2 = arr[j + 1].price_change_percentage_24h;
            if (value1 > value2) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return (arr);
}

let PercentBtn = document.getElementById("PercBtn");
PercentBtn.addEventListener('click', ()=> {
    getData().then((data)=>{
        return sortPerc(data);
    }).then((res)=>{
        table.innerHTML="";
        renderElement(res);
    })
}
);
