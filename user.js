document.addEventListener('DOMContentLoaded', function() {
  populateUser();
  populatelist(DATA.ahead, 'ahead');
  populatelist(DATA.behind, 'behind');
  document.getElementById('btn-leaderboard').addEventListener("click", () => {
    window.location="./index.html"
  })
});


function populateUser() {
  const user = DATA.user
  let avatar = document.createElement('img')
  avatar.src = user.profile === "" ? "./images/favicon.png" : user.profile
  avatar.className = 'circle avatar'
  document.getElementById('user-avatar').appendChild(avatar)

  userProfile = document.getElementById("user-profile")

  let username = document.createElement('h1')
  username.appendChild(document.createTextNode(user.name))
  userProfile.appendChild(username)

  let rank = document.createElement('h2')
  rank.appendChild(document.createTextNode('Rank: ' + user.rank))
  userProfile.appendChild(rank)

  createLeaderBoardPowerBar(userProfile, user)
  setGraphWidths()
}

function populatelist(data, id) {
  data.forEach((user, index) => {
    let row = document.createElement('tr')
    row.className = 'highlightable'
    let username = document.createElement('td')
    username.appendChild(document.createTextNode(user.name))
    let rank = document.createElement('td')
    rank.appendChild(document.createTextNode(user.rank))
    let stress = document.createElement('td')
    stress.appendChild(document.createTextNode(round(user.stress,0)))

    row.appendChild(username)
    row.appendChild(rank)
    row.appendChild(stress)
    document.getElementById(id).appendChild(row)
  })
}
