function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function getPowerBarPercent(power) {
  return round((power / (DATA.top[0].stress + 50) * 100), 0);
}

function div(classes) {
  return el('div', classes);
}

function img(classes) {
  return el('img', classes);
}

function el(tag, classes) {
  const el = document.createElement(tag)
  classes.forEach((className) => {
    el.classList.add(className);
  })
  return el;
}

function PowerBar(leaderBoardRow, user, specialClass) {
  this.user           = user;
  this.power          = div(['power', specialClass]);
  this.bar            = div(['bar']);
  this.innerBar       = div(['inner-bar']);
  this.leaderBoardRow = leaderBoardRow;
}

PowerBar.prototype.addLabel = function(label) {
  this.innerBar.dataset.label = label;
}

PowerBar.prototype.addStyleWidth = function(width) {
  this.innerBar.style.width = width;
}

PowerBar.prototype.appendChildren = function() {
  this.bar.appendChild(this.innerBar);
  this.power.appendChild(this.bar);
  this.leaderBoardRow.appendChild(this.power);
}

function setGraphWidths() {
  const bars = [].slice.call(document.querySelectorAll('.inner-bar'));
  bars.map((bar, index) => {
    setTimeout(() => { setInnerBarWidth(bar) }, 0);
  })
  setTimeout(() => { applyLabels(bars) }, 1000);
}

function setInnerBarWidth(bar) {
  bar.style.width = getPowerBarPercent(bar.dataset.label) + "%";
}

function Label(bar) {
  this.bar = bar;
  this.text = bar.dataset.label;
  this.div = div(['data-label']);
}

Label.prototype.apply = function() {
  this.div.appendChild(document.createTextNode(this.text));
}

Label.prototype.append = function() {
  this.bar.appendChild(this.div);
}

function applyLabels(bars) {
  bars.map(function(bar) {
    let label = new Label(bar);
    label.apply();
    label.append();
  })
}
