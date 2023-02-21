// For QOL allow people to use up/down arrow to switch between input boxes
const inputBoxes = document.getElementsByTagName('input')
const submit = document.getElementById("submit")

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
        } else if (index + 1 == inputBoxes.length) {
          submit.click()
          inputBox.disabled = true
          inputBox.disabled = false
        }
      }
    })
  }
  inputBox.addEventListener('focus', (e) => {
    inputBox.className = inputBox.className.replace("error", "")
  })
  _index++
}

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
      createNotification(`Field '${box.id}' is empty!`)
    }
  }

  if (valid) {
    alert("valid!")
  }
})

const notifications = document.getElementById("notifications")
function createNotification(textContent) {
  createNotification(textContent, "")
}
function createNotification(textContent, type) {
  const notification = document.createElement("div")
  notification.className = "notification " + type

  const content = document.createElement("content")
  content.className = "content"
  content.innerText = textContent

  const close = document.createElement("i")
  close.className = "close fa-solid fa-xmark"
  close.addEventListener('click', () => {
    notification.remove()
  })

  notification.appendChild(content)
  notification.appendChild(close)

  notifications.appendChild(notification)
  setTimeout(() => {
    notification.remove()
  }, 1500)
}

createNotification("Normal popup", "okay")
createNotification("Good popup", "good")
createNotification("Error popup")
