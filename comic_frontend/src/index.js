
const allComicsDiv = document.getElementById('comicDiv');

//TO DO HERE
/*Create a function to render the index page:
*1. fetch all comics in a get method
*2. for each comic, create a div to show the comic (author, title, desc.)
*3. add comic book div to main div
*/

addEventListener('DOMContentLoaded',allComics);

//render all comics in get request
function allComics(event) {

    fetch('https://localhost3000/comics')
    .then((response) => response.json())
    .then((data) => {
        for (var i = 0; i < data.length; i++) {

            //comic div and elements of comic
            let newComic = document.createElement('div');
            let title = document.createElement('p');
            let author = document.createElement('p');
            let image = document.createElement('img')
            image.src = data[i]['image'];
            title.innerText = data[i]['title'];
            author.innerText = data[i]['author'];

            let addComicBtn = document.createElement('button');
            addComicBtn.innerText = 'Subscribe to This Comic';
            
            //adding comics to div
            newComic.addChild(image);
            newComic.addChild(title);
            newComic.addChild(author);
            newComic.addChild(addComicBtn);

            allComicsDiv.addChild(newComic);
        }
    })
}
