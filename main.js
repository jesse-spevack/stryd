document.addEventListener('DOMContentLoaded', function() {
  // console.log(DATA)
  let list = document.createElement('ul');


  let headers = ['Rank', 'Username', 'Stress']
  let header = document.createElement('li');

  let headerRank = document.createElement('div')
  headerRank.className = 'header header-rank'
  headerRank.appendChild(document.createTextNode('Rank'))
  header.appendChild(headerRank)

  let headerUsername = document.createElement('div')
  headerUsername.className = 'header header-username'
  headerUsername.appendChild(document.createTextNode('Username'))
  header.appendChild(headerUsername)

  let headerPower = document.createElement('div')
  headerPower.className = 'header header-power'
  headerPower.appendChild(document.createTextNode('Power'))
  header.appendChild(headerPower)

  list.appendChild(header)
  DATA.top.forEach((leader) => {
    let listItem = document.createElement('li');
    listItem.className = 'leader'

    let rank = document.createElement('div')
    rank.className = 'rank'
    rank.appendChild(document.createTextNode(leader.rank + 1))
    listItem.appendChild(rank)

    let userIcon = document.createElement('img')
    userIcon.src = leader.profile === "" ? "./images/favicon.png" : leader.profile
    userIcon.className = 'userIcon'
    listItem.appendChild(userIcon)

    let username = document.createElement('div')
    username.className = 'username'
    username.appendChild(document.createTextNode(leader.name))
    listItem.appendChild(username)

    let power = document.createElement('div')
    let bar = document.createElement('div')
    let innerBar = document.createElement('div')
    power.className = 'power'
    bar.className = 'bar'
    innerBar.className = 'inner-bar'
    innerBar.dataset.label = round(leader.stress, 1)
    innerBar.style.width = getPowerBarPercent(leader.stress) + "%"

    bar.appendChild(innerBar)
    power.appendChild(bar)
    listItem.appendChild(power)

    list.appendChild(listItem)
  })
  document.getElementById('container').appendChild(list)
});


function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier
}


function getPowerBarPercent(power) {
  return round((power / DATA.top[0].stress * 100), 0)
}
