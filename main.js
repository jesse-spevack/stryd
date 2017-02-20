document.addEventListener('DOMContentLoaded', function() {
  let leaderBoard = document.getElementById('leaderboard');
  DATA.top.forEach((leader) => {
    let leaderBoardRow = createLeaderBoardRow()
    createLeaderBoardTextElement(leaderBoardRow, 'rank leader-board-cell col-1 col-m-1', (leader.rank + 1))
    createLeaderBoardAvatar(leaderBoard, leader)
    createLeaderBoardTextElement(leaderBoardRow, 'leader-board-cell col-4 col-m-4', leader.name )
    createLeaderBoardPowerBar(leaderBoardRow, leader, 'col-6')
    leaderBoard.appendChild(leaderBoardRow)
  })
  setGraphWidths()
  document.getElementById('view-stats').addEventListener("click", () => {
    window.location="./user.html"
  })
});

function createLeaderBoardRow(){
  leaderBoardRow = document.createElement('div');
  leaderBoardRow.className = 'leader highlightable row';
  return leaderBoardRow;
}

function createLeaderBoardTextElement(leaderBoardRow, className, text) {
  let element = document.createElement('div')
  element.className = className
  element.appendChild(document.createTextNode(text))
  leaderBoardRow.appendChild(element)
}


function createLeaderBoardAvatar(leaderBoard, leader) {
  let image = document.createElement('div')
  image.className = 'leader-board-cell col-1 col-m-1'
  let userIcon = document.createElement('img')
  userIcon.src = leader.profile === "" ? "./images/favicon.png" : leader.profile
  userIcon.className = 'circle userIcon'
  image.appendChild(userIcon)
  leaderBoardRow.appendChild(image)
}
