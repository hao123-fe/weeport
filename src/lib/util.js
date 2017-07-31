export const focusNextInput = $el => {
  setTimeout(() => {
    const $nextEl = $el.nextElementSibling
    if ($nextEl && $nextEl instanceof HTMLInputElement) {
      $nextEl && $nextEl.focus && $nextEl.focus()
    }
  })
}

export const focusPrevInput = $el => {
  const $nextEl = $el.nextElementSibling
  const $prevEl = $el.previousElementSibling
  if (!$nextEl || !($nextEl instanceof HTMLInputElement)) {
    $prevEl && $prevEl.focus && $prevEl.focus()
  }
}

export const week = date => {
  date = date instanceof Date ? date : new Date()
  var first = new Date(date.getFullYear(), 0, 1)
  var diff = ((date - first) / 86400000)
  var days = (diff + first.getDay())
  return Math.floor(days / 7).toString()
}

export const transDate = date => {
  const year = date.getFullYear()
  const month = (month => {
    let ret = (month + 1).toString()
    return ret.length === 1 ? '0' + ret : ret
  })(date.getMonth())
  const day = (date => {
    let ret = date.toString()
    return ret.length === 1 ? '0' + ret : ret
  })(date.getDate())
  return `${year}-${month}-${day}`
}

export const getDate = date => {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export const getDateRange = date => {
  const startDate = new Date(date)
  const endDate = new Date(date)
  const day = (new Date(date)).getDay()
  startDate.setDate(startDate.getDate() - day)
  endDate.setDate(endDate.getDate() + 7 - day - 1)
  return {
    start: transDate(startDate),
    end: transDate(endDate)
  }
}

export const hasReport = props => !(
  !props.thisWeek.length
  && !props.nextWeek.length
  && !props.projects.length
)