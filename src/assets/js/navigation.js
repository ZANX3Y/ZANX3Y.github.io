const navLinks = document.querySelectorAll('nav a')
const sections = document.querySelectorAll('main section')
const navTrack = document.getElementById('nav-track')

function moveTrack(targetLink, initial = false) {
    if (!navTrack || !targetLink) return

    Object.assign(navTrack.style, {
        transition: initial ? 'none' : '',
        top: `${targetLink.offsetTop}px`,
        left: `${targetLink.offsetLeft}px`,
    })
}

function updateActive(targetLink, initial = false) {
    if (!targetLink) return
    const targetId = targetLink.getAttribute('href')?.substring(1)
    const targetSection = targetId ? document.getElementById(targetId) : null

    targetLink.style.transition = initial ? 'none' : ''

    navLinks.forEach(link => link.classList.remove('active'))
    targetLink.classList.add('active')

    sections.forEach(section => section.classList.remove('active'))
    if (targetSection) targetSection.classList.add('active')

    moveTrack(targetLink, initial)
}

function syncFromHash(initial = false) {
    const hash = window.location.hash
    const linkFromHash = hash ? document.querySelector(`nav a[href="${hash}"]`) : null
    updateActive(linkFromHash ?? navLinks[0], initial)
}

window.addEventListener('hashchange', () => syncFromHash())
window.addEventListener('popstate', () => syncFromHash())

window.addEventListener('resize', () => {
    moveTrack(document.querySelector('nav a.active'), true)
})

navLinks.forEach(link =>
    link.addEventListener('click', () => updateActive(link))
)

syncFromHash(true)
