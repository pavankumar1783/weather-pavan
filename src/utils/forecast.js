const request = require('request')

const forecast = (address, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=aef7f8909d0875422e9c7ed8bdb49ad5&query='+address;

    request({ url, json: true }, (error,document) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (document.body.error) {
            callback('Unable to find location', undefined)
        } else {
            const loc=document.body.location
            const cur=document.body.current
            callback(undefined,{
                location:loc.name+', '+loc.region+', '+loc.country,
                forecast:cur.weather_descriptions[0],
                temperature:cur.temperature,
                feelslike:cur.feelslike,
                humidity:cur.humidity
            })
        }
    })
}

module.exports = forecast