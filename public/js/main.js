const deleteBtn = document.querySelectorAll('.del')
const postItem = document.querySelectorAll('span.not')

try {
    const logo = document.querySelector('#logo')
    logo.addEventListener('mouseout', stopAnimateLogo)
    logo.addEventListener('mouseover', animateLogo)
} 
catch (err) {
    console.log('')
}

try {
    const biglogo = document.querySelector('#biglogo')
    biglogo.addEventListener('mouseout', stopAnimateLogo)
    biglogo.addEventListener('mouseover', animateLogo)
}
catch (err) {
    console.log('')
}

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deletePost)
})

function animateLogo(event) {
    console.log('moved in!')
    const imageElement = event.target;
    imageElement.src = '/images/logoanimate.gif'
}

function stopAnimateLogo(event) {
    const imageElement = event.target;
    imageElement.src = '/images/staticlogo.png'
}

function confirmDelete(event) {
    console.log('are you sure?')
    const dialog = confirm("Are you sure you want to delete this post?")
    return dialog
}

async function deletePost(){
    const postId = this.parentNode.parentNode.dataset.id
    if (confirm("Are you sure you want to delete this post? This can't be undone!")) {
        try{
            const response = await fetch('/blogPost/deletePost', {
                method: 'delete',   
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'postIdFromJSFile': postId
                })
            })
            const data = await response.json()
            console.log(data)
            location.assign('/')
        }catch(err){
            console.log(err)
        }
    }
}
