const logout = () => {
    window.location.href='/api/auth/logout'
}
const home = () => {
    window.location.href='/dashboard/home'
}
const shortener = () => {
    window.location.href='/dashboard/shortener'
}
const forms = () => {
    window.location.href='/dashboard/forms'
}
const analytics = () => {
    window.location.href='/dashboard/analytics'
}
const user = () => {
    window.location.href='/dashboard/user'
}
const admin = () => {
    window.location.href='/dashboard/manage'
}

const taskbarFunctions = {
    'taskicon-home': home,
    'taskicon-shortener': shortener,
    'taskicon-forms': forms,
    'taskicon-analytics': analytics,
    'taskicon-user': user,
    'taskicon-admin': admin,
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