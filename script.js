
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



let table = document.getElementById("table");
getData().then((data)=>{
    renderElement(data);
});


let searchbar = document.getElementById("searchbar");
searchbar.addEventListener('keydown', (event)=>{
    if(event.key==="Enter"){
        if(searchbar.value!=""){
            getData().then((data)=>{
                let filtered = data.filter((item)=>{
                    return ((searchbar.value).toLowerCase() == (item.name).toLowerCase() || (searchbar.value).toLowerCase() == (item.symbol).toLowerCase());
                })
                return filtered;
            }).then((res)=>{
                table.innerHTML="";
                console.log(res);
                renderElement(res);
            });
        }
        else{
            getData().then((data)=>{
                table.innerHTML="";
                renderElement(data);
            });
            
        }

    }
})




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
