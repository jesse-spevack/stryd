document.addEventListener('DOMContentLoaded', function() {
  let list = document.createElement('ul');
  createHeader(list)

  DATA.top.forEach((leader) => {
    let listItem = createListItem()
    createLeaderElement(listItem, leader.rank + 1, 'rank')
    createLeaderElement(listItem, leader.name, 'username')
    createLeaderImage(listItem, leader)
    createLeaderBar(listItem, leader)
    list.appendChild(listItem)
  })
  document.getElementById('container').appendChild(list)
  setGraphWidths()
});

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier
}

function getPowerBarPercent(power) {
  return round((power / (DATA.top[0].stress + 50) * 100), 0)
}

function setGraphWidths() {
  console.log('setting widths.')
  let _bars = [].slice.call(document.querySelectorAll('.inner-bar'));
  _bars.map((bar, index) => {
    setTimeout(() => {
      console.log(bar.dataset.label)
      bar.style.width = getPowerBarPercent(bar.dataset.label) + "%";
    }, 0);
  })
  setTimeout(() => {
    applyLabels()
  }, 1000)
}

function applyLabels() {
  let _bars = [].slice.call(document.querySelectorAll('.inner-bar'));
  _bars.map((bar, index) => {
    div = document.createElement('div')
    div.className = 'data-label'
    div.appendChild(document.createTextNode(bar.dataset.label))
    bar.appendChild(div)
  })
}

function createHeader(list) {
  let header = document.createElement('li');
  createHeaderLabel(header, 'rank')
  createHeaderLabel(header, 'username')
  createHeaderLabel(header, 'power')
  list.appendChild(header)
}

function createHeaderLabel(header, label) {
  let headerLabel = document.createElement('div')
  headerLabel.className = `header header-${label}`
  headerLabel.appendChild(document.createTextNode(label.toUpperCase()))
  header.appendChild(headerLabel)
}

function createLeaderElement(listItem, text, className) {
  let rank = document.createElement('div')
  rank.className = className
  rank.appendChild(document.createTextNode(text))
  listItem.appendChild(rank)
}

function createLeaderImage(listItem, leader) {
  let userIcon = document.createElement('img')
  userIcon.src = leader.profile === "" ? "./images/favicon.png" : leader.profile
  userIcon.className = 'userIcon'
  listItem.appendChild(userIcon)
}

function createLeaderBar(listItem, leader){
  let power = document.createElement('div')
  let bar = document.createElement('div')
  let innerBar = document.createElement('div')
  power.className = 'power'
  bar.className = 'bar'
  innerBar.className = 'inner-bar'
  innerBar.dataset.label = round(leader.stress, 1)
  innerBar.style.width = "0%"
  bar.appendChild(innerBar)
  power.appendChild(bar)
  listItem.appendChild(power)
}

function createListItem() {
  let listItem = document.createElement('li');
  listItem.className = 'leader';
  return listItem;
}
