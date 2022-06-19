fetch('/api/users/getUser').then(data => {
    data.json().then(jsonData => {
        //determine Greet Message
        let msg=''
        if((new Date()).getHours()>=0 && (new Date()).getHours()<12) {
            msg='Good Morning '
        }
        else if((new Date()).getHours()>=12 && (new Date()).getHours()<17) {
            msg='Good Afternoon '
        }
        else {
            msg='Good Evening '
        }
        msg+=jsonData.name+' !'
        document.getElementById('greetBoxMsg').innerText=msg
    })
})

document.getElementById('shortenerBTN').onclick = () => {
    window.location.href = '/dashboard/shortener'
}

document.getElementById('formsBTN').onclick = () => {
    window.location.href = '/dashboard/forms'
}

document.getElementById('analyticsBTN').onclick = () => {
    window.location.href = '/dashboard/analytics'
}

document.getElementById('userBTN').onclick = () => {
    window.location.href = '/dashboard/user'
}

document.getElementById('adminBTN').onclick = () => {
    window.location.href = '/dashboard/manage'
}