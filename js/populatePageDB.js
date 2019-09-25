const addItemDB = (data, id) => {
    const list = document.querySelector('.container');    
    if (data.imageUrl === undefined){
        html = `
        <div class="item nes-container with-title is-dark" data-id=${id}>
            <p class="title characterName">${data.title}</p>
            <p class="description">${data.description}</p>
            <br>
            <p class="explanation">${data.explanation}</p>
        </div>
        `;
    } else {
        html = `
        <div class="item nes-container with-title is-dark">
            <p class="title characterName">${data.title}</p>
            <img class="listImage" src="${data.imageUrl}" alt="Image of ${data.title}">
            <p class="description">${data.description}</p>
            <br>
            <p class="explanation">${data.explanation}</p>
        </div>
        `;
    }
    list.innerHTML += html;
}

function setLoader(){
    setTimeout(removeLoader, 1000);
    document.getElementById('content').style.display = 'none';
}

function removeLoader(){
    document.getElementById('loader').style.display = 'none';
    document.getElementById('content').style.display = '';
}

setLoader();

