const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const bandUL = document.querySelector('#bands')

const listBands = (arr) => {
    let li = ''
    arr.forEach(band => {
        let item = `
            <li>${band}</li>
        `
        li += item
    })

    bandUL.innerHTML = li
}

const strip = name => {
    return name.replace(/^(a |the |an )/i, '').trim()
}

const sortNoArticles = (arr) => {
    // let articles = ['A', 'An', 'The']
    // let sorted = arr.sort((a,b) => {
    //     let aSplit = a.split(' ')
    //     let bSplit = b.split(' ')
    //     let aWord
    //     let bWord

    //     if (articles.includes(aSplit[0])) {
    //         aWord = aSplit[1];
    //     } else {
    //         aWord = aSplit[0];
    //     }

    //     if (articles.includes(bSplit[0])) {
    //         bWord = bSplit[1];
    //     } else {
    //         bWord = bSplit[0];
    //     }

    //     return aWord > bWord ? 1 : -1
    // })

    let sorted = arr.sort((a,b) => strip(a) > strip(b) ? 1 : -1)

    listBands(sorted)
}

listBands(bands)

window.addEventListener('click', () => sortNoArticles(bands))