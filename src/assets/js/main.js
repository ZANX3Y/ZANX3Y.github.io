// ----- NAVIGATION -----
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

// ----- HOME SECTION -----
const socials = document.querySelector('#socials')
const tooltip = socials.querySelector('#handle-tooltip')
const tooltipText = tooltip.querySelector('span')
const links = socials.querySelectorAll('a')

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
const style = getComputedStyle(tooltipText)
context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`

links.forEach(link => {
    const handleMetrics = context.measureText(link.dataset.handle)
    const handleWidth = handleMetrics.width

    link.addEventListener('mouseenter', () => {
        const handleText = link.dataset.handle
        if (!handleText) return

        tooltipText.textContent = handleText

        const bgWidth = link.offsetWidth + handleWidth
        const iconPadding = link.clientHeight / 6

        links.forEach(l => l.style.zIndex = '2')
        link.style.zIndex = '4'

        const linkRect = link.getBoundingClientRect()
        const spaceOnRight = window.innerWidth - (linkRect.right - (link.offsetWidth / 2) + iconPadding)
        const showOnLeft = spaceOnRight < bgWidth

        const baseSize = tooltip.clientHeight

        Object.assign(tooltip.style, {
            zIndex: '3',
            width: `${bgWidth}px`,
            padding: showOnLeft ? `0 ${baseSize}px 0 0` : `0 0 0 ${baseSize}px`,
            left: showOnLeft
                ? `${link.offsetLeft + link.offsetWidth - iconPadding - bgWidth}px`
                : `${link.offsetLeft + iconPadding}px`,
            top: `${link.offsetTop}px`,
            opacity: '1',
            textAlign: showOnLeft ? 'right' : 'left',
        })
    })

    link.addEventListener('mouseleave', () => {
        links.forEach(l => l.style.zIndex = '2')
        tooltip.style.zIndex = '1'
        tooltip.style.opacity = '0'
    })
})

// ----- CONTACT SECTION -----
const pgpKey = document.getElementById('pgp-key')
const copyPgpBtn = document.getElementById('copy-pgp')
const copyPgpBtnIcon = copyPgpBtn.querySelector('i')
const copyPgpBtnText = copyPgpBtn.querySelector('span')

function resetCopyButton() {
    setTimeout(() => {
        copyPgpBtnIcon.textContent = 'content_copy'
        copyPgpBtnText.textContent = 'Copy Key'
    }, 2000)
}

copyPgpBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(pgpKey.textContent.trim())
        .then(() => {
            copyPgpBtnIcon.textContent = 'check'
            copyPgpBtnText.textContent = 'Copied!'
            resetCopyButton()
        })
        .catch(err => {
            console.error('Failed to copy: ', err)
            copyPgpBtnIcon.textContent = 'close'
            copyPgpBtnText.textContent = 'Error'
            resetCopyButton()
        })
})
