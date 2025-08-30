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
