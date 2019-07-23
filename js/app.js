const sections = Array.from(document.getElementsByTagName('section'))
const title = document.getElementById('title')

function focusOnScroll () {
  sections.forEach(section => section.classList.remove('section-active'))
  if (isElementInViewport(title)) return
  const activeSection = sections.find(section => isElementInViewport(section.childNodes[1].childNodes[1]))
  activeSection && activeSection.classList.add('section-active')
}

window.onscroll = focusOnScroll

function isElementInViewport (element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function renderNavbar () {
  const nav = document.getElementById('navbar__list')
  const homeLink = document.createElement('li')
  homeLink.innerText = 'Home'
  homeLink.className = 'menu__link'
  homeLink.onclick = () => window.scrollTo({ top: 0 })
  nav.appendChild(homeLink)
  sections.forEach(section => {
    if (!section.dataset || !section.dataset.nav) return
    const item = document.createElement('li')
    item.innerText = section.dataset.nav
    item.className = 'menu__link'
    item.onclick = () => section.scrollIntoView()
    nav.appendChild(item)
  })
}

renderNavbar()
