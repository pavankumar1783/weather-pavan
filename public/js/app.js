console.log('Client side javascript file is loaded! Hello World')

const w=document.querySelector('form')
const p1=document.querySelector('.success')
const p2=document.querySelector('.error')
const p3=document.querySelector('.s3')
const p4=document.querySelector('.s4')
w.addEventListener('submit',(e)=>{
    const loc=document.querySelector('input').value
    console.log(loc)
    p1.textContent='Loading...'
    p2.textContent=''
    p3.textContent=''
    p4.textContent=''
    fetch('/weather?address='+loc).then((response)=>{
    response.json().then((data) => {
        if(data.error)
            p1.textContent=data.error
        else {
           p1.textContent='Location : '+data.location
           p2.textContent='Forecast : '+data.forecast
           p3.textContent='It is '+data.temperature+'C but it feels like '+data.feelslike+'C'
           p4.textContent='Humidity : '+data.humidity
        }
    })
})
    document.querySelector('input').value='';
    e.preventDefault()
})