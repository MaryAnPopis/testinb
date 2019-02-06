const API_URL = 'http://testinb-api.us-west-2.elasticbeanstalk.com/api/v1'
//const API_URL = 'http://localhost:5000/api/v1'

export const post = (path, data) => {
  return fetch(`${API_URL}/${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(err => {
      throw err
    })
}

export const patch = (path, data) => {
  return fetch(`${API_URL}/${path}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(err => {
      throw err
    })
}

export const getByParam = (path, param) => {
  return fetch(`${API_URL}/${path}/${param}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(err => {
      throw err
    })
}

export const upload = (path, key, data) => {
  let options = {
    headers: {
      Accept: 'application/json',
    },
    method: 'POST',
  }

  options.body = new FormData()
  options.body.append(key, data)

  return fetch(`${API_URL}/${path}`, options)
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(err => {
      throw err
    })
}
