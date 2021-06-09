console.log('Client side javascript file is loaded! Hello World')

fetch('http://localhost:5000/weather?address=!').then((response)=>{
    response.json().then((data) => {
        if(data.error)
            console.log(data.error)
        else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const w=document.querySelector('form')
const p1=document.querySelector('.success')
const p2=document.querySelector('.error')
w.addEventListener('submit',(e)=>{
    const loc=document.querySelector('input').value
    console.log(loc)
    p1.textContent='Loading...'
    p2.textContent=''
    fetch('http://localhost:5000/weather?address='+loc).then((response)=>{
    response.json().then((data) => {
        if(data.error)
            p1.textContent=data.error
        else {
           p1.textContent=data.location
           p2.textContent=data.forecast
        }
    })
})
    document.querySelector('input').value='';
    e.preventDefault()
})