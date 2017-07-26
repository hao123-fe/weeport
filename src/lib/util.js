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
