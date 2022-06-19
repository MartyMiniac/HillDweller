const logout = () => {
    window.location.href='/api/auth/logout'
}
const ytbl = () => {
    
}
const taskbarFunctions = {
    'taskicon-home': ytbl,
    'taskicon-shortener': ytbl,
    'taskicon-forms': ytbl,
    'taskicon-analytic': ytbl,
    'taskicon-user': ytbl,
    'taskicon-admin': ytbl,
    'taskicon-logout': logout
}
const taskbarbuttons = document.getElementsByClassName('taskicon')
for(let i=0; i<taskbarbuttons.length; i++) {
    taskbarbuttons[i].onclick = (e) => {
        for(let j=0; j<taskbarbuttons.length; j++) {
            taskbarbuttons[j].classList.remove('taskiconselected')
        }
        taskbarFunctions[e.composedPath()[0].id]()
        e.composedPath()[0].classList.add('taskiconselected')
    }
}
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