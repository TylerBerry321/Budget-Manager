// For QOL allow people to use up/down arrow to switch between input boxes
const inputBoxes = document.getElementsByTagName('input')
var _index = 0
for (let inputBox of inputBoxes) {
  if (inputBox.getAttribute('type') == 'text') {
    const index = _index
    inputBox.addEventListener('keydown', (e) => {
      // If is keyUp
      if (e.key === 'ArrowUp') {
        // Check if we have another element
        if (index - 1 >= 0) {
          // Focus the previous element
          inputBoxes[index - 1].focus()
        }
      } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
        // Check if we have another element
        if (index + 1 < inputBoxes.length) {
          // Focus the previous element
          inputBoxes[index + 1].focus()
        }
      }
    })
  }
  inputBox.addEventListener('focus', (e) => {
    inputBox.className = inputBox.className.replace("error", "")
  })
  _index++
}

const submit = document.getElementById("submit")
submit.addEventListener('click', () => {
  var valid = true
  // Check all boxes are valid
  for (let box of inputBoxes) {
    if (box.dataset.optional === 'true') {
      continue
    }
    // Check validity of input
    if (box.value === null || box.value.length == 0) {
      if (!box.className.includes("error"))
        box.className += "error"
      valid = false
    }
  }

  if (valid) {
    alert("valid!")
  }
})