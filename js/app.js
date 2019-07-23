const sections = Array.from(document.getElementsByTagName('section'))
const title = document.getElementById('title')
const navbarList = document.getElementById('navbar__list')

/**
 * Function called on each scroll event.
 * It checks for the elements in viewport and sets active classes accordingly.
 */
function focusOnScroll () {
  sections.forEach(section => section.classList.remove('section-active'))
  if (isElementInViewport(title)) {
    navbarList.childNodes[0].classList.add('navbar-active')
    navbarList.childNodes.forEach((navLink, index) =>
      index && navLink.classList.remove('navbar-active'))
  } else {
    const activeIndex = sections.findIndex(section => isElementInViewport(section.childNodes[1].childNodes[1]))
    const activeSection = sections[activeIndex]
    const activeLink = navbarList.childNodes[activeIndex + 1]
    activeSection && activeSection.classList.add('section-active')
    activeLink && activeLink.classList.add('navbar-active')
    navbarList.childNodes.forEach((navLink, index) =>
      index !== (activeIndex + 1) && navLink.classList.remove('navbar-active'))
  }
}

window.onscroll = focusOnScroll

/**
 * Checks if the element is inside the viewport.
 *
 * @param element: HTML element to check
 * @returns {boolean}
 */
function isElementInViewport (element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Populates the navbar list items with the section data.
 */
function renderNavbar () {
  const homeLink = document.createElement('li')
  homeLink.innerText = 'Home'
  homeLink.className = 'menu__link'
  homeLink.onclick = () => window.scrollTo({ top: 0 })
  navbarList.appendChild(homeLink)
  sections.forEach(section => {
    if (!section.dataset || !section.dataset.nav) return
    const item = document.createElement('li')
    item.innerText = section.dataset.nav
    item.className = 'menu__link'
    item.onclick = () => section.scrollIntoView()
    navbarList.appendChild(item)
  })
}

renderNavbar()
focusOnScroll()
