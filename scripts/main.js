document.addEventListener('DOMContentLoaded', function() {
  let leaderBoard = document.getElementById('leaderboard');
  DATA.top.forEach((user) => {
    const leaderRow = new LeaderBoardRow(leaderBoard, user)
    leaderRow.appendRank();
    leaderRow.appendAvatar();
    leaderRow.appendUsername();
    leaderRow.appendPowerBar();
    leaderBoard.appendChild(leaderRow.row)
  })
  setGraphWidths();
  addListener();
});

function addListener() {
  document.getElementById('view-stats').addEventListener("click", () => {
    window.location="./user.html"
  })
}

function LeaderBoardRow(leaderBoard, user) {
  this.leaderBoard  = leaderBoard;
  this.user         = user;
  this.row          = div(['leader', 'highlightable', 'row']);
  this.image        = div(['leader-board-cell', 'col-1', 'col-m-1']);
  this.userIcon     = img(['circle', 'userIcon'])
  this.rank         = div(['rank', 'leader-board-cell', 'col-1', 'col-m-1']);
  this.username     = div(['leader-board-cell', 'col-4', 'col-m-4']);
}

LeaderBoardRow.prototype.appendRank = function() {
  this.rank.appendChild(document.createTextNode(this.user.rank + 1))
  this.row.appendChild(this.rank)
}

LeaderBoardRow.prototype.appendUsername = function() {
  this.username.appendChild(document.createTextNode(this.user.name))
  this.row.appendChild(this.username)
}

LeaderBoardRow.prototype.appendAvatar = function() {
  this.userIcon.src = this.user.profile === "" ? "./images/favicon.png" : this.user.profile
  this.image.appendChild(this.userIcon)
  this.row.appendChild(this.image)
}

LeaderBoardRow.prototype.appendPowerBar = function() {
  powerBar = new PowerBar(this.row, this.user, 'col-6');
  powerBar.addLabel(round(this.user.stress, 0));
  powerBar.addStyleWidth("0%");
  powerBar.appendChildren();
}
