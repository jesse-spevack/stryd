function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier
}

function getPowerBarPercent(power) {
  return round((power / (DATA.top[0].stress + 50) * 100), 0)
}

function createLeaderBoardPowerBar(leaderBoardRow, leader, className) {
  let power = document.createElement('div')
  let bar = document.createElement('div')
  let innerBar = document.createElement('div')
  power.className = 'power ' + className
  bar.className = 'bar'
  innerBar.className = 'inner-bar'
  innerBar.dataset.label = round(leader.stress, 0)
  innerBar.style.width = "0%"
  bar.appendChild(innerBar)
  power.appendChild(bar)
  leaderBoardRow.appendChild(power)
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
