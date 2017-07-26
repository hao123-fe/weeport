const initData = {
  config: {},
  reports: []
}

const getData = () => {
  const weeport = localStorage.getItem('weeport')
  if (!weeport) {
    localStorage.setItem('weeport', JSON.stringify(initData))
    return initData
  } else {
    return JSON.parse(weeport)
  }
}

export const save = (key, value) => {
  const data = getData()
  data[key] = Object.assign({}, data[key], value)
  localStorage.setItem('weeport', JSON.stringify(data))
}

export const load = (key, value) => getData()[key]