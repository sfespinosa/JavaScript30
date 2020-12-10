const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
let effect
let blur = false

function getVideo() {
    // pulls webcam video
    navigator.mediaDevices.getUserMedia({ video: true, audio: false}) // returns a promise
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play()
        })
        .catch(err => {
            console.error('OH NO!', err);
        })
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width
    canvas.height = height

    interval = setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height)
        let pixels = ctx.getImageData(0, 0, width, height)
        if (effect === 'red') {
            pixels = redEffect(pixels);
            ctx.globalAlpha = 1;
        } else if (effect === 'rgb') {
            pixels = rgbSplit(pixels)
        }       
        
        if (blur) {
            if (effect === 'red') {
                effect = undefined
            }

            ctx.globalAlpha = 0.1;
        } else {
            ctx.globalAlpha = 1;
        }

        // pixels = greenScreen(pixels)
        ctx.putImageData(pixels, 0, 0)
    }, 16)
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play()

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a')
    link.href = data;
    link.setAttribute('download', 'handsome')
    link.innerHTML = `<img src=${data} alt='YOU!' />`
    strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] + 100
        pixels.data[i+1] = pixels.data[i+1] - 50
        pixels.data[i+2] = pixels.data[i+2] * 0.5
    }
    return pixels
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i]
        pixels.data[i + 500] = pixels.data[i+1]
        pixels.data[i - 550] = pixels.data[i+2]

    }
    return pixels
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

function setEffect(str){
    if (str === 'blur') {
        blur = !blur
    } else if (str === 'clear') {
        blur = false
        effect = undefined
    } else {
        effect = str
    }
}

video.addEventListener('canplay', paintToCanvas)