const list = document.querySelector('.container');
const category = document.querySelector('.title').innerHTML;
console.log(category);
var URL;
switch(category){
    case "Bosses":
        URL = "https://isaac.jamesmcfadden.co.uk/api/v1/boss";
        break;
    case "Characters":
        URL = "https://isaac.jamesmcfadden.co.uk/api/v1/character";
        break;
    case "Environments":
        URL = "https://isaac.jamesmcfadden.co.uk/api/v1/environment";
        //No Images
        break;
    case "Items":
        URL = "https://isaac.jamesmcfadden.co.uk/api/v1/item";
        break;
    case "Monsters":
        URL = "https://isaac.jamesmcfadden.co.uk/api/v1/monster";
        break;
    case "Pickups":
        URL = "https://isaac.jamesmcfadden.co.uk/api/v1/pickup";
        break;
    case "Stats":
        URL = "https://isaac.jamesmcfadden.co.uk/api/v1/stat";
        //No Images
        break;
}

const addItem = (itemName, itemImage) => {
    if (itemImage === null){
        html = `
        <div class="item nes-container with-title is-dark">
            <p class="title characterName">${itemName}</p>
        </div>
        `;
    } else {
        html = `
        <div class="item nes-container with-title is-dark">
            <p class="title characterName">${itemName}</p>
            <img class="listImage" src="${itemImage}" alt="Image of ${itemName}">
        </div>
        `;
    }


    list.innerHTML += html;
}


fetch(URL)
    .then(rawResponse => {return rawResponse.json()})
    .then(response => {
        data = response.data;
        data.forEach(item => {
            addItem(item.name, item.sprite_url);
        });
    })

