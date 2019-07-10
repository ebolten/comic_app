
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
      header.innerHTML = "<h1 style='color:white;font-family:impact;text-align:center;background-color:darkred;height:75px'>Collective Comics</h1>";
      
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

      //go back to all comics
      let button = document.createElement('button')
      button.innerText = 'All Comics'

      button.addEventListener('click',allComics);

      let subs = document.createElement('h2');
      subs.innerText = 'YOUR SUBSCRIBED COMICS';

      profileDiv.appendChild(document.createElement('br'))
      profileDiv.appendChild(subs);
      profileDiv.appendChild(button);
  })
}

// get all info from marvel comic api and store it locally
const COMICS_URL = `http://localhost:3000/comics`

//clear DOM for whatever page
function clearDOM(page) {
    page.innerText = ""
}

addEventListener('DOMContentLoaded',function(){
    //GET request for all comics
    allComics();
});

//GET all comics
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
  goToProfile.innerText = 'Go to Your Profile';

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

    fetch(COMICS_URL)
    .then((response) => response.json())
    .then((data) => {

        for (var i = 0; i < data.length; i++) {
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

            let path = data[i]['image_url']
            image.src = `${path}.jpg`

            image.style.width = '200px'

            //render show page for image
            let thisComic = data[i]
            title.innerText = data[i]['title']
            newComic.id = title.innerText;
            // author.innerText = data.data.results[i]['author'];
            newComic.appendChild(br);

            if (data[i]['desc'] === null) {
              desc.innerText = "No Description.";
            } else {
              desc.innerText = data[i]['desc'].split('<br>')[0];
            }

            image.addEventListener('click', () => {
              renderComic(thisComic)
            })

            //adding comics to div
            newComic.appendChild(image);
            newComic.appendChild(titleDescDiv);

            allComicsDiv.appendChild(newComic);
            indexPage.appendChild(allComicsDiv);
        }
    })
  }, 0300);
}

//will render the show page for comic
function renderComic(thisComic){
  clearDOM(indexPage)
  let comicContainer = document.createElement('div')
  let detailsContainer = document.createElement('div')
  detailsContainer.id = 'details-container'

  //the header for the comic
  let header = document.createElement('header')
  header.innerHTML =  "<h1 style='color:white;font-family:impact;text-align:center;background-color:darkred;height:75px'>Collective Comics</h1>"
  let comicName = document.createElement('h1')
  comicName.innerText = thisComic['title']

  let ul = document.createElement('ul')
  ul.id = 'details-ul'
  //adding the comic's cover image
  let comicImage = document.createElement('img')
  let path = thisComic['image_url'];
  comicImage.src = `${path}.jpg`
  comicImage.style.width = '200px'
  comicImage.addEventListener('mouseenter', function(){
    let h3 = document.createElement('h3')
    h3.innerText = "Creators:"
    ul.appendChild(h3)
    extraData(thisComic)
  })
  comicImage.addEventListener('mouseleave', function(){
    ul.innerHTML = ''
  })

  //this comic's description
  let desc = document.createElement('p');
  desc.innerText = thisComic['desc'].split('<br>')[0];
  desc.style.wordWrap = 'break-word';
  desc.style.width = '500px'

  let button = document.createElement('button')
  button.innerText = 'All Comics'
  button.addEventListener('click', function (){
    returnToIndex()
  })

  //creating the subscribe button
  let subButton = document.createElement('button')
  subButton.innerText = 'Subscribe to This Comic'
  subButton.addEventListener('click', function (){
    subToThisComic(thisComic)
  })

  //append comics to the div
  comicContainer.append(comicName, comicImage, desc, button, subButton)
  getComicShowDiv().append(header, comicContainer, detailsContainer)
  detailsContainer.appendChild(ul)
}

//subscribes a user to a comic, with a POST fetch
function subToThisComic(thisComic){
  clearDOM(document.getElementById('comic-show-page'))

  subComicObj = {
    method: "POST",
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json'
    },
    body: JSON.stringify({
      user_id: 1,
      comic_id: thisComic.id
    })
  }

  fetch("http://localhost:3000/sites", subComicObj)
  .then(res => res.json())
  .then(data => profile())
}

//get comic show div
function getComicShowDiv(){
  return document.getElementById('comic-show-page')
}

//return the index page
function returnToIndex(){
  clearDOM(document.getElementById('comic-show-page'))
  allComics()
}

//extra data to render the creators
function extraData(thisComic){
  thisComic.creators.split(",").map((creatorElement) => {
    renderExtraData(creatorElement)
  })
}

//render data for creators to the show page
function renderExtraData(creatorElement){
  if(creatorElement !== ""){
    let li = document.createElement('li')
    li.innerText = creatorElement

    getShowPageUl().append(li)
  }
}

//return the UI for the show page
function getShowPageUl(){
  return document.getElementById('details-ul')
}

















































//
