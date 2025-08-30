const navLinks = document.querySelectorAll('nav a')
const sections = document.querySelectorAll('main section')
const navTrack = document.querySelector('nav .nav-track')

function moveTrack(targetLink, initial = false) {
    if (!navTrack || !targetLink) return

    Object.assign(navTrack.style, {
        transition: initial ? 'none' : '',
        top: `${targetLink.offsetTop}px`,
        left: `${targetLink.offsetLeft}px`,
    })
}

function updateActive(targetLink, initial = false) {
    const targetId = targetLink.getAttribute('href').substring(1)
    const targetSection = document.getElementById(targetId)

    targetLink.style.transition = initial ? 'none' : ''

    navLinks.forEach(link => link.classList.remove('active'))
    targetLink.classList.add('active')

    sections.forEach(section => section.classList.remove('active'))
    if (targetSection) targetSection.classList.add('active')

    moveTrack(targetLink, initial)
}

window.addEventListener('resize', () => {
    moveTrack(document.querySelector('nav a.active'), true)
})

navLinks.forEach(link =>
    link.addEventListener('click', () => updateActive(link))
)

const hash = window.location.hash
const initialLink = hash ? document.querySelector(`nav a[href="${hash}"]`) : null
updateActive(initialLink ?? navLinks[0], true)
