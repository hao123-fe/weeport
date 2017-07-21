export const focusNextInput = $el => {
  setTimeout(() => {
    const $nextEl = $el.nextElementSibling
    if ($nextEl && $nextEl instanceof HTMLInputElement) {
      $nextEl.focus()
    }
  })
}

export const focusPrevInput = $el => {
  const $nextEl = $el.nextElementSibling
  const $prevEl = $el.previousElementSibling
  if (!$nextEl || !($nextEl instanceof HTMLInputElement)) {
    $prevEl.focus()
  }
}