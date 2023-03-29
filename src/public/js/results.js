const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
})

const earnStatus = params.status
const moneyToEarn = params.moneyToEarn
const moneyToSave = params.moneyToSave
const tips = JSON.parse(params.tips)

if (earnStatus === undefined || moneyToEarn === undefined || moneyToSave === undefined) {
  const title = document.getElementById("title")
  title.innerHTML = `<h1>Error, returning home</h1>`
  location.href = "./"
  stop
}

const resultsTitle = document.getElementById("result-title")
const earningElement = document.getElementById("earnings")
const savingElement = document.getElementById("savings")
const tipsElement = document.getElementById("tips")

const addTip = (textDisplay) => {
  const element = document.createElement("div")
  element.className = "tip"
  const text = document.createElement("p")
  text.innerText = textDisplay
  element.appendChild(text)
  tipsElement.appendChild(element)
}

for (i in tips) {
  addTip(tips[i])
}

if (earnStatus === "EARNING") {
  resultsTitle.innerText = "You're on track!"
  earningElement.innerText = "You are earning enough."
  savingElement.innerHTML = "You are saving enough."
} else {
  if (earnStatus === 'PAY_RISE') resultsTitle.innerText = "Almost there!"
  else resultsTitle.innerText = "You're not there yet."
  if (moneyToEarn !== 0) earningElement.innerText = `You need to be earning £${moneyToEarn} more.`
  if (moneyToSave !== 0) savingElement.innerText = `You need to be saving £${moneyToSave} more.`
}