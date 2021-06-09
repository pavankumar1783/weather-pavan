const request = require('request')

const forecast = (address, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=aef7f8909d0875422e9c7ed8bdb49ad5&query='+address;

    request({ url, json: true }, (error,data) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (data.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,{
                location:data.body.location.name+', '+data.body.location.region+', '+data.body.location.country,
                forecast:data.body.current.weather_descriptions[0],
                temperature:data.body.current.temperature
            })
        }
    })
}

module.exports = forecast