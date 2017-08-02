const initData = {
  config: {},
  reports: []
}

const localStorage = global.localStorage
let storage = null

const getData = () => {
  if (!storage) {
    storage = JSON.parse(localStorage.getItem('weeport'))
  }
  const weeport = storage
  if (!weeport) {
    localStorage.setItem('weeport', JSON.stringify(initData))
    return initData
  } else {
    return storage
  }
}

export const save = (key, value) => {
  const data = getData()
  data[key] = Object.assign({}, data[key], value)
  localStorage.setItem('weeport', JSON.stringify(data))
}

export const load = (key, value) => getData()[key]
