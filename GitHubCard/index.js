/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
const axiosPromise = axios.get("https://api.github.com/users/evllz");
console.log(axiosPromise)
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ["https://api.github.com/users/rmjuarez12", "https://api.github.com/users/eddiemadrigal", "https://api.github.com/users/tetondan","https://api.github.com/users/dustinmyers","https://api.github.com/users/justsml","https://api.github.com/users/luishrd","https://api.github.com/users/bigknell"];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

function profile(object){
  const div = document.createElement('div')
  div.classList.add('card');
  const img = document.createElement('img');
  img.src = object.data.avatar_url;
  div.appendChild(img);
  const infodiv = document.createElement('div');
  infodiv.classList.add('card-info');
    const h3 = document.createElement('h3');
    h3.classList.add('name');
    h3.textContent = object.data.login;
    infodiv.appendChild(h3);
    const p = document.createElement('p');
    p.classList.add('username');
    p.textContent = object.data.name;
    infodiv.appendChild(p);
    const location = document.createElement('p');
    location.textContent = `Location: ${object.data.location}`;
    infodiv.appendChild(location);
    const profileUrl = document.createElement('p');
    profileUrl.textContent = 'Profile: ';
      const a = document.createElement('a');
      a.href = object.data.html_url;
      a.textContent = object.data.html_url;
      profileUrl.appendChild(a);
    infodiv.appendChild(profileUrl);
    const followers = document.createElement('p');
    followers.textContent = object.data.followers;
    infodiv.appendChild(followers);
    const following = document.createElement('p');
    followers.textContent = object.data.following;
    infodiv.appendChild(following);
    const bio = document.createElement('p');
    followers.textContent = object.data.bio;
    infodiv.appendChild(bio);
  div.appendChild(infodiv);
  return div;
}

axios.get("https://api.github.com/users/evllz")
     .then((r)=>{
       const profileCard = profile(r);
       console.log(profileCard)
       const cardsdiv = document.querySelector('.cards');
       cardsdiv.appendChild(profileCard);
     })

followersArray.forEach(element =>{
  axios.get(element)
     .then((r)=>{
       const profileCard = profile(r);
       console.log(profileCard)
       const cardsdiv = document.querySelector('.cards');
       cardsdiv.appendChild(profileCard);
     })
})

axios.get("https://api.github.com/users/tetondan")
    .then((r) => {
      axios.get(r.data.followers_url)
          .then(r => {
            r.data.forEach(element => {
              const profileAPI = element.url;
              axios.get(profileAPI)
              .then((r)=>{
                const profileCard = profile(r);
                console.log(profileCard)
                const cardsdiv = document.querySelector('.cards');
                cardsdiv.appendChild(profileCard);
              })
              
            })
          })
    })