var globalData = DATA
setInterval(() => {updateData(globalData.ahead, 'ahead')}, 5000)
setInterval(() => {updateData(globalData.behind, 'behind')}, 4500)

document.addEventListener('DOMContentLoaded', function() {
  populateUser();
  populateTable(DATA.ahead, 'ahead');
  populateTable(DATA.behind, 'behind');
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

function populateTable(data, id) {
  document.getElementById(id).innerHTML = `<tr><th>USERNAME</th><th class="center-text">RANK</th><th class="center-text">STRESS</th></tr>`
  data.forEach((user, index) => {
    let row = document.createElement('tr')
    let username = document.createElement('td')
    username.appendChild(document.createTextNode(user.name))
    let rank = document.createElement('td')
    rank.appendChild(document.createTextNode(user.rank))
    let stress = document.createElement('td')

    if(user.highlight){
      username.className = `darken ${user.highlight}`
      rank.className = `center-text darken ${user.highlight}`
      stress.className = `center-text darken ${user.highlight}`
    } else {
      rank.className = 'center-text'
      stress.className = 'center-text'
    }
    stress.appendChild(document.createTextNode(round(user.stress,0)))

    row.appendChild(username)
    row.appendChild(rank)
    row.appendChild(stress)
    document.getElementById(id).appendChild(row)
  })
}

function simulateDataFeed() {

  window.setInterval(updateData(globalData.ahead), 5000)
  // updateData(globalData.ahead)
}

function clearOldHighlights(data) {
  return data.map((user) => {
    delete user.highlight;
    return user;
  })
}

function getDifferentRandomIndex(length, randomIndex) {
  let randomIndex2 = getRandomIndex(length)
  while (randomIndex === randomIndex2) {
    randomIndex2 = getRandomIndex(length)
  }
  return randomIndex2;
}

function user(name, rank, stress, highlight) {
  this.name = name;
  this.rank = rank;
  this.stress = stress;
  this.highlight = highlight ? 'decrease' : 'increase';
}


function updateData(data, id) {
  var data = clearOldHighlights(data);

  const index1 = getRandomIndex(data.length);
  const index2 = getDifferentRandomIndex(data.length, index1);
  const user1 = data[index1];
  const user2 = data[index2];

  if (user1.stress === user2.stress) {
    debugger
  }

  const decreasedStress1 = user1.stress > user2.stress
  const decreasedStress2 = user2.stress > user1.stress

  if (decreasedStress2 === decreasedStress1) {
    debugger
  }

  let updated_user_1 = new user(user1.name, user2.rank, user2.stress, decreasedStress1)
  let updated_user_2 = new user(user2.name, user1.rank, user1.stress, decreasedStress2)


  if (updated_user_1.stress === updated_user_2.stress) {
    debugger
  }

  data[index1] = updated_user_1
  data[index2] = updated_user_2

  globalData.ahead = _.sortBy(data, 'rank')
  populateTable(globalData.ahead, id);
}

function getRandomIndex(length) {
  return _.random(length - 1);
}





function randomizeUserStress(user) {
  if(_.random(10) !== 1) {
    return user;
  } else {
    user.change = _.random(2) === 1 ? 1 : -1
    user.stress += _.random(1, true) * user.change
    return user;
  }
}
