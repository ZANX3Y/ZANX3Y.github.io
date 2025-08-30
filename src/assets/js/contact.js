const pgpKey = document.getElementById('pgp-key')
const copyPgpBtn = document.getElementById('copy-pgp')
const copyPgpBtnIcon = copyPgpBtn.querySelector('i')
const copyPgpBtnText = copyPgpBtn.querySelector('span')
let copyTimeout = undefined

const copyFallback = (text) => new Promise((resolve, reject) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'absolute'
    textArea.style.left = '-9999px'
    document.body.appendChild(textArea)
    textArea.select()

    try {
        document.execCommand('copy') ? resolve() : reject()
    } catch (err) {
        reject()
    } finally {
        document.body.removeChild(textArea)
    }
})

copyPgpBtn.addEventListener('click', () => {
    const text = pgpKey.textContent.trim()

    const promise = (navigator.clipboard && window.isSecureContext)
        ? navigator.clipboard.writeText(text)
        : copyFallback(text)

    promise
        .then(() => {
            copyPgpBtnIcon.textContent = 'check'
            copyPgpBtnText.textContent = 'Copied!'
        })
        .catch(() => {
            copyPgpBtnIcon.textContent = 'close'
            copyPgpBtnText.textContent = 'Error'
        })
        .finally(() => {
            clearTimeout(copyTimeout)
            copyTimeout = setTimeout(() => {
                copyPgpBtnIcon.textContent = 'content_copy'
                copyPgpBtnText.textContent = 'Copy Key'
            }, 2000)
        })
})
