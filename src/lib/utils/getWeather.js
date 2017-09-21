const axios = require('axios')
const crypto = require('crypto')
const { LocalStorage } = require('node-localstorage')

const localStorage = new LocalStorage('/tmp/.hyperline-weather')

const TIME_UNTIL_STALE = 10 * 60 * 1000

function darkSky(apiKey, lat, lng) {
  return axios.get(`https://api.darksky.net/forecast/${apiKey}/${lat},${lng}?exclude=minutely,hourly,daily,flags`).then(res => {
    return {
      lat,
      lng,
      icon: res.data.currently.icon,
      temperature: res.data.currently.temperature,
    }
  })
}

function read(file) {
  const data = localStorage.getItem(file)
  if (!data) return {}
  try {
    return JSON.parse(data)
  } catch (err) {
    return {}
  }
}

function write(file, conditions) {
  localStorage.setItem(file, JSON.stringify({
    conditions,
    lastUpdatedAt: Date.now(),
  }))
  return conditions
}

function fresh(weatherData) {
  if (!weatherData) return false
  return Date.now() - weatherData.lastUpdatedAt < TIME_UNTIL_STALE
}

function getFileKey(weatherConfig) {
  const { lat, lng } = weatherConfig
  const hash = crypto.createHash('md5').update(`${lat},${lng}`, 'utf-8').digest('hex')
  return `${hash}.json`
}

// 1. read from local store
// 2. check last update time, if < 20m then return else
// 3. query dark sky and get a response, if it fails drop and let the process try it again
// 4. on a successful response we serialize the response and store it on local + disk
function getWeather(weatherConfig) {
  const file = getFileKey(weatherConfig)
  if (!file) return Promise.reject(new TypeError('Lat/Lng invalid'))

  const weatherData = read(file)

  if (fresh(weatherData)) {
    return Promise.resolve(weatherData.conditions)
  }

  const { apiKey, lat, lng } = weatherConfig
  if (!apiKey) {
    return Promise.reject(new ReferenceError('Missing API Key'))
  }
  return darkSky(apiKey, lat, lng).then(conditions => write(file, conditions))
}

module.exports = getWeather
