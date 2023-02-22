// For QOL allow people to use up/down arrow to switch between input boxes
const inputBoxes = document.getElementsByTagName('input')
const submit = document.getElementById("submit")
const reset = document.getElementById("reset")

reset.addEventListener('click', () => {
  for (let inputBox of inputBoxes) {
    inputBox.value = ''
  }
})

var _index = 0
for (let inputBox of inputBoxes) {
  if (['text', 'number'].includes(inputBox.getAttribute('type'))) {
    const index = _index
    inputBox.addEventListener('keydown', (e) => {
      // If is keyUp
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        // Check if we have another element
        if (index - 1 >= 0) {
          // Focus the previous element
          inputBoxes[index - 1].focus()
        }
      } else if (e.key === 'ArrowDown' || e.key === 'Enter') {
        e.preventDefault()
        // Check if we have another element
        if (index + 1 < inputBoxes.length) {
          // Focus the previous element
          inputBoxes[index + 1].focus()
        } else if (index + 1 == inputBoxes.length) {
          submit.click()
          inputBox.disabled = true
          inputBox.disabled = false
        }
      } else if (!e.key.toString().match("[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab")) {
        e.preventDefault()
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
    const boxValueFloat = parseFloat(box.value)
    if (box.value === null || box.value.length == 0 || boxValueFloat == undefined || boxValueFloat < 0) {
      if (!box.className.includes("error"))
        box.className += "error"
      valid = false
      createNotification(`Field '${box.id}' is required!`)
    }
  }

  if (valid) {
    // TODO(Matt): API Call and go to new page with data
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
    const duration = 300
    notification.animate([
      {
        transform: `translateY(0)`,
        opacity: 1
      },
      {
        transform: `translateY(1rem)`,
        opacity: 0
      }
    ], {
      duration: duration,
      easing: `cubic-bezier(0.075, 0.82, 0.165, 1)`
    })
    setTimeout(() => {
      notification.remove()
    }, duration)
  }, 1500)
}