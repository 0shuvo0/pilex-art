const container = document.querySelector('.container')
const sizeEl = document.querySelector('.size')
let size = sizeEl.value
const color = document.querySelector('.color')
const resetBtn = document.querySelector('.btn')
const btnSave = document.querySelector('#btnSave')

let draw = false

function populate(size) {
    container.style.setProperty('--size', size)
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div')
        div.classList.add('pixel')

        div.addEventListener('mouseover', function() {
            if (!draw) return
            div.style.backgroundColor = color.value
        })
        div.addEventListener('mousedown', function() {
            div.style.backgroundColor = color.value
        })

        container.appendChild(div)
    }
}

window.addEventListener("mousedown", function() {
    draw = true
})
window.addEventListener("mouseup", function() {
    draw = false
})

function reset() {
    container.innerHTML = ''
    populate(size)
}

resetBtn.addEventListener('click', reset)

sizeEl.addEventListener('keyup', function() {
    size = sizeEl.value
    reset()
})

btnSave.addEventListener('click', function() {
    const PIXEL_SIZE = 10
    const outCanvas = document.createElement('canvas')
    outCanvas.width = size * PIXEL_SIZE
    outCanvas.height = size * PIXEL_SIZE
    const ctx = outCanvas.getContext('2d')

    const pixels = document.querySelectorAll('.pixel')
    const pixelsArray = Array.from(pixels)
    const pixelsData = pixelsArray.map(pixel => pixel.style.backgroundColor)

    for (let i = 0; i < pixelsData.length; i++) {
        const row = Math.floor(i / size)
        const col = i % size
        const pixelCanvas = document.createElement('canvas')
        pixelCanvas.width = PIXEL_SIZE
        pixelCanvas.height = PIXEL_SIZE
        const pixelCtx = pixelCanvas.getContext('2d')
        pixelCtx.fillStyle = pixelsData[i]
        pixelCtx.fillRect(0, 0, PIXEL_SIZE, PIXEL_SIZE)
        ctx.drawImage(pixelCanvas, col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)

    }


    const pixelsUrl = outCanvas.toDataURL("image/png")
    const downloadLink = document.createElement('a')
    downloadLink.href = pixelsUrl
    downloadLink.download = 'pixelart.png'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
})

populate(size)