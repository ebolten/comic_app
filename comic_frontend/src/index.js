
//will render the user's profile page
function profile(){
  //clear DOM for loading profile page
  const indexPage = document.getElementById('indexPage')
  clearDOM(indexPage);

  let profileDiv = document.getElementById('profilePage');

  //fetching specific profile
  fetch("http://localhost:3000/users/1")
  .then(response => response.json())
  .then((data) => {

      //profile header
      let header = document.createElement('header');
      header.style.backgroundColor = 'darkred';
      header.style.height = '85px';

      //profile's username
      let username = document.createElement('h1');
      username.innerText = data['username'];

      //profile's avatar
      let avatar = document.createElement('img');
      avatar.src = data['image_url'];
      avatar.style.width = '250px';
      avatar.style.length = '250px';

      //profile's bio
      let bio = document.createElement('p');
      bio.innerText = data['bio'];

      //append all nodes
      profileDiv.appendChild(header);
      profileDiv.appendChild(username);
      profileDiv.appendChild(avatar);
      profileDiv.appendChild(bio);
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
    //create a button to go to user's profile
    

   
    //GET request for all comics
    allComics();
});

//render all comics in get request
function allComics() {
  clearDOM(document.getElementById('profilePage'))
  clearDOM(document.getElementById('comic-show-page'))
  const indexPage = document.getElementById('indexPage');

  //the header for index page
  let header = document.createElement('header');
      
  header.style.backgroundColor = 'darkred';
  header.style.height = '150px';
  header.style.margin = '0px'
  let headerText = document.createElement('h1');
  headerText.innerText = 'COLLECTIVE COMICS';headerText.style.margin = '0px'
  headerText.style.color = 'white';headerText.style.textAlign = 'center';
  headerText.style.fontFamily = 'impact';headerText.style.fontSize = '85px'
  header.appendChild(headerText)

  //go to profile button
  let goToProfile = document.createElement('button');
  goToProfile.style.margin = '20px';
  goToProfile.style.width = '90px'; goToProfile.style.height = '45px';
  goToProfile.style.fontWeight = 'bold';goToProfile.style.cssFloat='right';
  goToProfile.innerText = 'Go To Profile';

  //add event listener to allow user to go to profile
  goToProfile.addEventListener('click',function(){
    profile(); //load user profile
  })

  indexPage.appendChild(header);
  indexPage.appendChild(goToProfile);

  setTimeout(function(){
    const profilePage = document.getElementById('profilePage').innerText = '';
    const allComicsDiv = document.createElement('div');
    const indexPage = document.getElementById('indexPage');

    fetch(`https://gateway.marvel.com/v1/public/comics?ts=1&apikey=${publicKey}&hash=${hash}`)
    .then((response) => response.json())
    .then((data) => {

        for (var i = 0; i < data.data.results.length; i++) {
            let br = document.createElement('br');

            //comic div and elements of comic
            let newComic = document.createElement('div');
            newComic.style.margin = '20px'
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

            image.style.width = '200px'

            //render show page for image
            let thisComic = data.data.results[i]
            title.innerText = data.data.results[i]['title'];
            newComic.id = title.innerText;
            // author.innerText = data.data.results[i]['author'];
            newComic.appendChild(br);

            if (data.data.results[i]['description'] === null) {
              desc.innerText = "No Description.";
            } else {
              desc.innerText = data.data.results[i]['description'].split('<br>')[0];
            }

            image.addEventListener('click', () => {
              renderComic(thisComic)
            })

            //adding comics to div
            newComic.appendChild(image);
            newComic.appendChild(titleDescDiv);
            // newComic.appendChild(author);
            // newComic.appendChild(addComicBtn);

            allComicsDiv.appendChild(newComic);
            indexPage.appendChild(allComicsDiv);

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
  const indexPage = document.getElementById('indexPage')
  clearDOM(indexPage)
  let comicContainer = document.createElement('div')

  //the header for the comic
  let header = document.createElement('header')
  header.style.backgroundColor = 'darkred';
  header.style.height = '85px'

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

  let button = document.createElement('button')
  button.innerText = 'All Comics';
  button.addEventListener('click', function (){
    returnToIndex()
  })

  //append comics to the div
  comicContainer.append(comicName, comicImage, desc, button)
  getComicShowDiv().append(header, comicContainer)
}

//get comic show div
function getComicShowDiv(){
  return document.getElementById('comic-show-page')
}

function returnToIndex(){
  clearDOM(document.getElementById('comic-show-page'))

  allComics()
  //this will not work until we have allcomics() render the indexpage programmatically. see comic-show-page structure
}

















































//
