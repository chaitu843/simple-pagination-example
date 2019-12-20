// const fetch = require('node-fetch');
const results = document.querySelector('.results');
const pageLinks = document.querySelector('.page-numbers');

fetch(`https://jsonplaceholder.typicode.com/users`)
.then(res => res.json())
.then(res => {
    pagination(res, 1);
});

function pagination(res, currPage) {
    let totalPages = res.length/2,
        arrStart = currPage == 1 ? 0 : currPage * 2 - 2,
        displayRes = res.slice(arrStart, arrStart+2);
    results.innerHTML = '';
    pageLinks.innerHTML = '';
    displayRes.forEach(element => {
        results.insertAdjacentHTML('beforeend', `
        <div class= "result">
            <span> ${element.name} </span> <br />
            <span> ${element.email} </span> 
        </div>
    `);
    });
    if(currPage > 1) {
        pageLinks.innerHTML += `<button class="prev">page ${currPage-1}</button>`;
    }

    if(currPage != totalPages){
        pageLinks.innerHTML += `<button class="next">page ${currPage+1}</button>`;
    }

    pageLinks.addEventListener('click', (e) => {
        let element = e.target;
        if(element.className === 'prev') pagination(res, currPage -1);
        if(element.className === 'next') pagination(res, currPage + 1);
    })
    
}