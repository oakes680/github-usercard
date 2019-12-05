/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
           */

axios.get('https://api.github.com/users/oakes680')
  .then(response => {
    //console.log(response)
    const myInfo = response.data
    //console.log(myInfo)
    cards.appendChild(cardMaker(myInfo))

  })



/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

const cards = document.querySelector('.cards')



/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

//const followersArray = ['oakes680', 'tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell', 'andybolos'];
//console.log(followersArray)
let dustinArray = []
//console.log(dustinArray)
//console.log(dustinArray.length)

axios.get('https://api.github.com/users/dustinmyers/followers')
  .then(response => {
    for (let i = 0; i < response.data.length; i++) {
      dustinArray.push(response.data[i].login)
    }
    dustinArray.forEach((item) => {
      axios.get(`https://api.github.com/users/${item}`)
        .then(response => {
          const myInfo = response.data
          //console.log(item)
          cards.appendChild(cardMaker(myInfo))  
          
          //console.log(item)
        })
    })
  })

axios.get("https://api.github.com/users/alexandercsierra/followers")
  .then(obj => {
    console.log(obj)
    let otherfollowersArray = obj.data;
    console.log(obj.data)
    return otherfollowersArray;})
  
  .then(arr => arr.map(user => {
    //console.log(arr)
      let profileURL = "https://api.github.com/users/" + user.login;
      axios.get(profileURL)
      .then(response => {
        let container = document.querySelector(".cards");
        container.appendChild(cardMaker(response.data));
      })
    })
    
  )
  .catch(error => console.log(error))



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

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

// GitHubCalendar(".calendar", "IonicaBizau", {
//   responsive: true
// });

function cardMaker(gitH) {
 
  const divCard = document.createElement('div')
  const imgUser = document.createElement('img')
  const divInfo = document.createElement('div')
  const h3Name = document.createElement('h3')
  const pUser = document.createElement('p')
  const pLocation = document.createElement('p')
  const pProfile = document.createElement('p')
  const pFollowers = document.createElement('p')
  const pFollowing = document.createElement('p')
  const pBio = document.createElement('p')
  const calendar = document.createElement('div')
 

  divCard.classList.add('card')
  divInfo.classList.add('card-info')
  h3Name.classList.add('name')
  pUser.classList.add('username')
  calendar.classList.add('calendar')

  

  imgUser.src = gitH.avatar_url
  h3Name.textContent = `Name: ${gitH.name}`
  pUser.textContent = gitH.login
  pLocation.textContent = `Location: ${gitH.location}`
  pProfile.innerHTML = `Profile: <a href='#'>${gitH.html_url}</a>`
  pFollowers.textContent = `Followers: ${gitH.followers}`
  pFollowing.textContent = `Following: ${gitH.following}`
  pBio.textContent = `Bio: ${gitH.bio}`


  

  divCard.appendChild(imgUser);
  divCard.appendChild(divInfo)
  divInfo.appendChild(h3Name)
  divInfo.appendChild(pUser)
  divInfo.appendChild(pLocation)
  divInfo.appendChild(pProfile)
  divInfo.appendChild(pFollowers)
  divInfo.appendChild(pFollowing)
  divInfo.appendChild(pBio)
  divInfo.appendChild(calendar)

   GitHubCalendar(calendar, gitH.login, {
    responsive: true
   });

  return divCard


}

/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
