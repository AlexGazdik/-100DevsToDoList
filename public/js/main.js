//constant variable the grabs all elements under the 'del' class
const deleteBtn = document.querySelectorAll('.del')
//constant variable that grabs all span elements with the 'todoItem' class
const todoItem = document.querySelectorAll('.todoItem span')
//constant variable that grabs all span elements with the 'todoItem' class with the prop completed
const todoComplete = document.querySelectorAll('.todoItem span.completed')

//creates an array from the deletebtun grab and assigns a smurf thats listens for click, onclick runs deletTodo function
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})
//creates an array from the todoItem grab and assigns a smurf thats listens for clock, onclick runs markComplete function
Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})
//creates an array from the todoComplete grab and assigns a smurf thats listens for clock, onclick runs undo function
Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', undo)
})
//create deleteTodo function
async function deleteTodo(){
//const consisting of
    const todoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'rainbowUnicorn': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)

    }
}


async function markComplete(){
    const todoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'rainbowUnicorn': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)

    }
}
async function undo(){
    const todoText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('undo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'rainbowUnicorn': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)

    }
}