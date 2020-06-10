const heartBtn = document.getElementById('heart_btn')

const serverUrl = 'http://localhost:3000/rate'
const method = 'POST'
const headers = { 'Content-Type': 'application/json' }
const userId = heartBtn.getAttribute('data-id')
const locationId = heartBtn.getAttribute('data-locationId')

heartBtn.addEventListener('click', (e) => {
  const isRated = heartBtn.classList.contains('rated')

  fetch(serverUrl, {
    method,
    headers,
    body: JSON.stringify({ userId, locationId }),
  }).then(() => {
    heartBtn.classList.toggle('rated')
    window.location.reload()
  })
})
