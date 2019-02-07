const API_URL = 'http://testinb-api.us-west-2.elasticbeanstalk.com/api/v1'
//const API_URL = 'http://localhost:5000/api/v1'

export const getCurrentDate = () => {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 //January is 0!

  let yyyy = today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  today = mm + '/' + dd + '/' + yyyy
  return today
}

export const deleteItemStore = (list, itemId, currentState) => {
  let deleteItem = list.find(item => item.id === itemId)
  let index = list.indexOf(deleteItem)
  let newList = currentState
  newList.splice(index, 1)

  return newList
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.error('save state error on local storagee', err)
  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

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
