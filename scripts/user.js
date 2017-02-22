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

function UserPanel(user) {
  this.user = user;
  this.profileImage = user.profile || "./images/favicon.png";
  this.avatar = img(['circle', 'avatar'])
  this.avatarContainer = document.getElementById('user-avatar')
  this.userProfileContainer = document.getElementById('user-profile')
  this.username = document.createElement('h1')
  this.rank = document.createElement('h2')
}

UserPanel.prototype.appendImage = function() {
  this.avatar.src = this.profileImage;
  this.avatarContainer.appendChild(this.avatar)
}

UserPanel.prototype.appendUsername = function() {
  this.append(this.userProfileContainer, this.username, this.user.name)
}

UserPanel.prototype.appendRank = function() {
  this.append(this.userProfileContainer, this.rank, `Rank: ${this.user.rank}`)
}

UserPanel.prototype.append = function(container, child, text) {
  child.appendChild(document.createTextNode(text))
  container.appendChild(child)
}

UserPanel.prototype.appendPowerBar = function() {
  powerBar = new PowerBar(this.userProfileContainer, this.user);
  powerBar.addLabel(round(this.user.stress, 0));
  powerBar.addStyleWidth("0%");
  powerBar.appendChildren();
}

function populateUser() {
  const panel = new UserPanel(DATA.user);
  panel.appendImage();
  panel.appendUsername();
  panel.appendRank();
  panel.appendPowerBar();
  setGraphWidths();
}

function DataTable(data, id) {
  this.data = data;
  this.id = id;
  this.headerRow = `<tr><th>USERNAME</th><th class="center-text">RANK</th><th class="center-text">STRESS</th></tr>`
}

DataTable.prototype.clearTable = function () {
  document.getElementById(this.id).innerHTML = this.headerRow
};

DataTable.prototype.populateRows = function() {
  this.data.forEach((user, index) => {
    const tableRow = new Row(user)
    tableRow.appendUsername();
    tableRow.appendRank();
    tableRow.appendStress();
    tableRow.addStyles();

    document.getElementById(this.id).appendChild(tableRow.row)
  })
}

function Row(user) {
  this.user = user;
  this.userStress = round(user.stress, 2);
  this.row = document.createElement('tr');
  this.username = document.createElement('td');
  this.rank = document.createElement('td');
  this.stress = document.createElement('td');
  this.highlightedNumericalClassName = `center-text darken ${user.highlight}`
  this.numericalClassName = 'center-text'
}

Row.prototype.appendUsername = function() {
  this.appendTableData(this.username, this.user.name)
}

Row.prototype.appendRank = function() {
  this.appendTableData(this.rank, this.user.rank)
}

Row.prototype.appendStress = function() {
  this.appendTableData(this.stress, this.userStress)
}

Row.prototype.appendTableData = function(container, text) {
  container.appendChild(document.createTextNode(text))
  this.row.appendChild(container)
}

Row.prototype.addStyles = function() {
  if (this.user.highlight) {
    this.username.className = `darken ${user.highlight}`;
    this.rank.className = this.highlightedNumericalClassName
    this.stress.className = this.highlightedNumericalClassName
  } else {
    this.rank.className = this.numericalClassName;
    this.stress = this.numericalClassName
  }
}

function populateTable(data, id) {
  table = new DataTable(data, id)
  table.clearTable();
  table.populateRows();
  // document.getElementById(id).innerHTML = `<tr><th>USERNAME</th><th class="center-text">RANK</th><th class="center-text">STRESS</th></tr>`
  // data.forEach((user, index) => {
  //   let row = document.createElement('tr')
  //   let username = document.createElement('td')
  //   username.appendChild(document.createTextNode(user.name))
  //   let rank = document.createElement('td')
  //   rank.appendChild(document.createTextNode(user.rank))
  //   let stress = document.createElement('td')
  //
  //   if(user.highlight){
  //     username.className = `darken ${user.highlight}`
  //     rank.className = `center-text darken ${user.highlight}`
  //     stress.className = `center-text darken ${user.highlight}`
  //   } else {
  //     rank.className = 'center-text'
  //     stress.className = 'center-text'
  //   }
  //   stress.appendChild(document.createTextNode(round(user.stress,0)))
  //
  //   row.appendChild(username)
  //   row.appendChild(rank)
  //   row.appendChild(stress)
  //   document.getElementById(id).appendChild(row)
  // })
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
