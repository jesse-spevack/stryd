var globalData = DATA
setInterval(() => {updateData(globalData.ahead, 'ahead')}, 5000);
setInterval(() => {updateData(globalData.behind, 'behind')}, 4500);

document.addEventListener('DOMContentLoaded', function() {
  populateUser();
  populateTable(DATA.ahead, 'ahead');
  populateTable(DATA.behind, 'behind');
  document.getElementById('btn-leaderboard').addEventListener("click", () => {
    window.location = "./index.html";
  })
});

function UserPanel(user) {
  this.user                 = user;
  this.profileImage         = user.profile || "./images/favicon.png";
  this.avatar               = img(['circle', 'avatar']);
  this.avatarContainer      = document.getElementById('user-avatar');
  this.userProfileContainer = document.getElementById('user-profile');
  this.username             = document.createElement('h1');
  this.rank                 = document.createElement('h2');
}

UserPanel.prototype.appendImage = function() {
  this.avatar.src = this.profileImage;
  this.avatarContainer.appendChild(this.avatar);
}

UserPanel.prototype.appendUsername = function() {
  this.append(this.userProfileContainer, this.username, this.user.name);
}

UserPanel.prototype.appendRank = function() {
  this.append(this.userProfileContainer, this.rank, `Rank: ${this.user.rank}`);
}

UserPanel.prototype.append = function(container, child, text) {
  child.appendChild(document.createTextNode(text));
  container.appendChild(child);
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
  this.headerRow = `<tr><th>USERNAME</th><th class="center-text">RANK</th><th class="center-text">STRESS</th></tr>`;
}

DataTable.prototype.clearTable = function () {
  document.getElementById(this.id).innerHTML = this.headerRow;
};

DataTable.prototype.populateRows = function() {
  this.data.forEach((user, index) => {
    const tableRow = new Row(user)
    tableRow.appendUsername();
    tableRow.appendRank();
    tableRow.appendStress();
    tableRow.addStyles();

    document.getElementById(this.id).appendChild(tableRow.row);
  })
}

function Row(user) {
  this.user                           = user;
  this.userStress                     = round(user.stress, 2);
  this.row                            = document.createElement('tr');
  this.username                       = document.createElement('td');
  this.rank                           = document.createElement('td');
  this.stress                         = document.createElement('td');
  this.highlightedNumericalClassName  = `center-text darken ${user.highlight}`;
  this.numericalClassName             = 'center-text';
}

Row.prototype.appendUsername = function() {
  this.appendTableData(this.username, this.user.name);
}

Row.prototype.appendRank = function() {
  this.appendTableData(this.rank, this.user.rank);
}

Row.prototype.appendStress = function() {
  this.appendTableData(this.stress, this.userStress);
}

Row.prototype.appendTableData = function(container, text) {
  container.appendChild(document.createTextNode(text));
  this.row.appendChild(container);
}

Row.prototype.addStyles = function() {
  if (this.user.highlight) {
    this.username.className = `darken ${user.highlight}`;
    this.rank.className     = this.highlightedNumericalClassName;
    this.stress.className   = this.highlightedNumericalClassName;
  } else {
    this.rank.className     = this.numericalClassName;
    this.stress.className   = this.numericalClassName;
  }
}

function populateTable(data, id) {
  table = new DataTable(data, id);
  table.clearTable();
  table.populateRows();
}

function user(name, rank, stress, highlight) {
  this.name = name;
  this.rank = rank;
  this.stress = stress;
  this.highlight = highlight ? 'decrease' : 'increase';
}

function UpdatedData(data, id) {
  this.data = data;
  this.id = id;
}

UpdatedData.prototype.getRandomIndex = function() {
  return _.random(this.data.length - 1);
}

UpdatedData.prototype.setIndexes = function() {
  this.index1 = this.getRandomIndex();
  this.index2 = this.getDifferentRandomIndex();
}

UpdatedData.prototype.getDifferentRandomIndex = function() {
  let randomIndex2 = this.getRandomIndex();
  while (this.index1 === randomIndex2) {
    randomIndex2 = this.getRandomIndex();
  }
  return randomIndex2;
}

UpdatedData.prototype.swapUsers = function() {
  this.user1 = this.data[this.index1];
  this.user2 = this.data[this.index2];
}

UpdatedData.prototype.createUsers = function() {
  const user1 = this.user1;
  const user2 = this.user2;
  const decreasedStress1 = user1.stress > user2.stress;
  const decreasedStress2 = user2.stress > user1.stress;

  this.updated_user_1 = new user(user1.name, user2.rank, user2.stress, decreasedStress1);
  this.updated_user_2 = new user(user2.name, user1.rank, user1.stress, decreasedStress2);
}

UpdatedData.prototype.storeNewData = function() {
  this.data[this.index1] = this.updated_user_1;
  this.data[this.index2] = this.updated_user_2;
  globalData[this.id] = _.sortBy(this.data, 'rank');
}

UpdatedData.prototype.clearOldHighlights = function() {
  this.data = this.data.map((user) => {
    delete user.highlight;
    return user;
  })
}

function updateData(data, id) {
  updatedData = new UpdatedData(data, id)
  updatedData.clearOldHighlights();
  updatedData.setIndexes();
  updatedData.swapUsers();
  updatedData.createUsers();
  updatedData.storeNewData();
  populateTable(globalData[id], id);
}
