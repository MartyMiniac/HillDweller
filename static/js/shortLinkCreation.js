const checkShortLinkAvailable = (link) => {
    return new Promise((resolve, refuse) => {
        fetch('/api/shortener/linkAvailable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "shortLink": link
            })
        })
        .then(data => {
            data.json().then(dataJson => {
                if(dataJson.success===true) {
                    resolve(dataJson.data)
                }
                else {
                    refuse()
                }
            })
        })
    })
}
const createShortenedLink = (fullLink, shortLink) => {
    return new Promise((resolve, refuse) => {
        fetch('/api/shortener/createLink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "url": fullLink,
                "shortLink": shortLink
            })
        })
        .then(data => {
            if(data.status===200) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        })
        .catch(err => {
            refuse(err)
        })
    })
}
const regexMatchLink = (url) => {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
    const regex = new RegExp(expression)

    if (url.match(regex)) {
        return true
    }
    else {
        return false
    }
}
const LinkCreationSuccess = () => {
    document.getElementById('fullLink').value=''
    document.getElementById('shortLink').value=''
    document.getElementById('createLinkBtn').classList.remove('createLinkBtn')
    document.getElementById('createLinkBtn').classList.add('createLinkBtn-finished')
    document.getElementById('createLinkBtn').innerText='Link Created'
    setTimeout(() => {
        document.getElementById('createLinkBtn').classList.add('createLinkBtn')
        document.getElementById('createLinkBtn').classList.remove('createLinkBtn-finished')
        document.getElementById('createLinkBtn').innerHTML='<i class="fa" id="createLinkBtnSpinner"></i> Create Link'
    }, 5000)
}
const LinkCreationFailure = (msg) => {
    document.getElementById('createLinkBtn').classList.remove('createLinkBtn')
    document.getElementById('createLinkBtn').classList.add('createLinkBtn-failed')
    document.getElementById('createLinkBtn').innerText=msg
    setTimeout(() => {
        document.getElementById('createLinkBtn').classList.add('createLinkBtn')
        document.getElementById('createLinkBtn').classList.remove('createLinkBtn-failed')
        document.getElementById('createLinkBtn').innerHTML='<i class="fa" id="createLinkBtnSpinner"></i> Create Link'
    }, 2000)
}
document.getElementById('createLinkBtn').onclick = async () => {
    //check if any of the fields are empty
    const spinner = document.getElementById('createLinkBtnSpinner')
    spinner.classList.add("fa-circle-o-notch")
    spinner.classList.add("fa-spin")
    if(document.getElementById('fullLink').value==='') {
        LinkCreationFailure('Full Link Empty')
        spinner.classList.remove("fa-circle-o-notch")
        spinner.classList.remove("fa-spin")
    }
    else if(document.getElementById('shortLink').value==='') {
        LinkCreationFailure('Short Link Empty')
        spinner.classList.remove("fa-circle-o-notch")
        spinner.classList.remove("fa-spin")
    }
    
    //check if full link is a valid url
    else if(!regexMatchLink(document.getElementById('fullLink').value)) {
        LinkCreationFailure('Full link invalid')
        spinner.classList.remove("fa-circle-o-notch")
        spinner.classList.remove("fa-spin")
    }
    //check if the short link is available
    else if(!(await checkShortLinkAvailable(document.getElementById('shortLink').value))) {
        LinkCreationFailure('Short link not available')
        spinner.classList.remove("fa-circle-o-notch")
        spinner.classList.remove("fa-spin")
    }
    
    //all the validations passed procceed with creation of link
    else {
        createShortenedLink(document.getElementById('fullLink').value, document.getElementById('shortLink').value)
        .then(data => {
            spinner.classList.remove("fa-circle-o-notch")
            spinner.classList.remove("fa-spin")
            LinkCreationSuccess()
            renderMyLinks()
        })
    }
}