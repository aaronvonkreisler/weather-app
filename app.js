//API Call Example -- api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const key = "7049ccd4b7e6506724fc802cdc22fd22"
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const rain = "https://images.unsplash.com/photo-1486016006115-74a41448aea2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
const sunny = "https://images.unsplash.com/photo-1421091242698-34f6ad7fc088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
const cloudy = "https://images.unsplash.com/photo-1527162609982-c69059c941e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
const defaultImage = "https://images.unsplash.com/photo-1545193544-312983719627?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"

const form = document.querySelector('#form')

document.getElementById('image').src = defaultImage

const handleForm = (e) => {
    e.preventDefault()
    const city = document.querySelector('#city').value
    getWeatherData(city)
}

document.querySelector('#form').addEventListener('submit', handleForm)

const getWeatherData = async (city) => {
    const response = await fetch(`${baseUrl}q=${city}&units=imperial&appid=${key}`)

    if(response.status === 200){
        const data = response.json()
        data.then((response) => {
            renderData(response)
        })
    } else {
        throw new Error ('Error with Weather API Call!')
    }
}

const renderData = (response) => {

    const description = response.weather[0].description
    //Grab Element Areas from html
    const tempEl = document.getElementById('temp')
    const detailsEl = document.getElementById('details')
    const cityNameEl = document.getElementById('name')
    const feelsLikeEl = document.getElementById('feels-like')
    const image = document.getElementById('image')


    if (description.includes('rain')) {
        image.src = rain
    } else if (description.includes('clear')) {
        image.src = sunny
    } else if (description.includes('cloud')) {
        image.src = cloudy
    } else {
        image.src = defaultImage
    }

    tempEl.textContent = `${response.main.temp} degrees F`
    detailsEl.textContent = description
    cityNameEl.textContent = response.name
    feelsLikeEl.textContent = `${response.main.feels_like} degrees F`

    console.log(response)
}


