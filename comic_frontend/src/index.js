
//will render the user's profile page
function profile(){

    let header = document.createElement('header');

    let profileDiv = document.getElementById('profilePage');

    //fetching specific profile
    fetch("http://localhost:3000/users/1")
    .then(response => response.json())
    .then((data) => {
        let username = document.createElement('h1');
        username.innerText = data['username'];

        let avatar = document.createElement('img');
        avatar.src = data['image_url'];

        avatar.style.width = '250px'
        avatar.style.length = '250px'

        profileDiv.appendChild(username);
        profileDiv.appendChild(avatar);
    })
}

// get all info from marvel comic api and store it locally
const ts = Date.now()
const privateKey = `f5952eba34e221888fc1781c728c129bc0b2f258`
const publicKey = `ac5ddc00ec3a557a8ca5ba50cb6f6dad`
const hash = `6d2d52ca118da80bf099aa9f227845a0`
const COMICS_URL = `http://localhost:3000/comics`

//clear DOM for whatever page
function clearDOM(page) {
    page.innerText = ""
}

addEventListener('DOMContentLoaded',function(){
    //clear DOM for user's profile
    const indexPage = document.getElementById('indexPage')
    let goToProfile = document.getElementById('profileButton');

    goToProfile.addEventListener('click',function(){
        profile(); //load user profile
    })
    //GET request for all comics
    allComics();
});

//render all comics in get request
function allComics(event) {
  setTimeout(function(){
    const profilePage = document.getElementById('profilePage').innerText = '';
    const allComicsDiv = document.getElementById('comicDiv');

    fetch(`https://gateway.marvel.com/v1/public/comics?ts=1&apikey=${publicKey}&hash=${hash}`)
    .then((response) => response.json())
    .then((data) => {

        for (var i = 0; i < data.data.results.length; i++) {
            let br = document.createElement('br');

            //comic div and elements of comic
            let newComic = document.createElement('div');
            let title = document.createElement('p');
            title.style.fontWeight = 'bold';
            title.style.fontSize = '20px';
            // let author = document.createElement('p');
            let image = document.createElement('img');
            let desc = document.createElement('p');

            //setting the width of the description box
            desc.style.wordWrap = 'break-word';
            desc.style.width = '500px'

            let titleDescDiv = document.createElement('div')
            titleDescDiv.appendChild(title);
            titleDescDiv.appendChild(desc);

            // titleDescDiv.style.cssFloat = 'left';

            let path = data.data.results[i]['thumbnail']['path'];
            image.src = `${path}.jpg`

            image.style.width = '100px'
            image.style.length = '100px'

            //render show page for image
            let thisComic = data.data.results[i]
            title.innerText = data.data.results[i]['title'];
            newComic.id = title.innerText;
            // author.innerText = data.data.results[i]['author'];
            desc.innerText = data.data.results[i]['description'].split('<br>')[0];
            image.addEventListener('click', () => {
              renderComic(thisComic)
            })

            //adding comics to div
            newComic.appendChild(image);
            newComic.appendChild(titleDescDiv);
            // newComic.appendChild(author);
            // newComic.appendChild(addComicBtn);

            allComicsDiv.appendChild(newComic);

            //POST for each comic (post to database)
            fetch(COMICS_URL,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                },
                //POST data
                body: JSON.stringify({
                    title: title.innerText,
                    desc: desc.innerText,
                    image_url: image.src
                }
            )})
            .then((response) => response.json())
            .then((data) => {

            })

        }
    })
  }, 0300);
}

//will render the show page for comic
function renderComic(thisComic){
  clearDOM(indexPage)
  let comicContainer = document.createElement('div')

  //the header for the comic
  let header = document.createElement('header')
  header.innerHTML =  "<h1 style='color:white;background-color:darkred;height:75px'>COMICS ARE COOL :D</h1>"
  let comicName = document.createElement('h1')
  comicName.innerText = thisComic.title

  //adding the comic's cover image
  let comicImage = document.createElement('img')
  let path = thisComic['thumbnail']['path'];
  comicImage.src = `${path}.jpg`
  comicImage.style.width = '200px'

  //this comic's description
  let desc = document.createElement('p');
  desc.innerText = thisComic['description'].split('<br>')[0];
  desc.style.wordWrap = 'break-word';
  desc.style.width = '500px'

  //append comics to the div
  comicContainer.append(comicName, comicImage, desc)
  getComicShowDiv().append(header, comicContainer)
}

//get comic show div
function getComicShowDiv(){
  return document.getElementById('comic-show-page')
}


















































//
