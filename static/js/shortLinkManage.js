const getShortLinks = () => {
    return new Promise((resolve, refuse) => {
        fetch('/api/shortener/getMyLinks')
        .then(data => {
            data.json().then(dataJson => {
                resolve(dataJson)
            })
        })
        .catch(err => {
            refuse(err)
        })
    })
}
const deleteShortenedLink = (id) => {
    return new Promise((resolve, refuse) => {
        fetch('/api/shortener/deleteLink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": id
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
const renderMyLinks = () => {
    let finalLinks = ''
    getShortLinks().then(data => {
        for(let i=0; i<data.length; i++) {
            let url = data[i].url
            if(!url.startsWith('http')) {
                url='http://'+url
            }
            const domain = new URL(url)
            const faviconLink = 'http://'+domain.hostname+'/favicon.ico'

            finalLinks+=`<div class="shortenedLinksEntity">
                    <object data="${faviconLink}" type="image/png">
                        <img src="/static/icons/questionmark.png">
                    </object>
                    <div class="shortenedLinkInfo">
                        <p>
                            ${data[i].shortLink}<br>
                            <a href="${url}" target="_blank">${url}</a><br>
                            Clicks: ${data[i].clicks}
                        </p>
                    </div>
                    <img src="/static/icons/delete.svg" id="shortLinkDeleteButton" objectid="${data[i]._id}">
                </div>
                `
        }
        document.getElementById('shortenedLinksList').innerHTML=finalLinks
        document.querySelectorAll('#shortLinkDeleteButton').forEach(e => {
            e.addEventListener('click', e => {
                deleteShortenedLink(e.composedPath()[0].getAttribute('objectid')).then(data => {
                    renderMyLinks()
                })
            })
        })
    })
}
document.onreadystatechange = () => {
    if(document.readyState==='complete') {
        renderMyLinks()
    }
}