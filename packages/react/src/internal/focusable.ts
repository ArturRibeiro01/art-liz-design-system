export function focusableElements(root: HTMLElement) {
  const candidates = [
    ...root.querySelectorAll<HTMLElement>(
      'button, input, select, textarea, a[href], area[href], summary, iframe, [tabindex], [contenteditable]:not([contenteditable="false"])',
    ),
  ].filter(
    (element) =>
      element.tabIndex >= 0 &&
      !element.matches(':disabled') &&
      !element.closest('[inert]') &&
      element.getClientRects().length > 0 &&
      getComputedStyle(element).visibility !== 'hidden',
  )
  return candidates.filter((element) => {
    if (!(element instanceof HTMLInputElement) || element.type !== 'radio' || !element.name)
      return true
    const group = candidates.filter(
      (candidate): candidate is HTMLInputElement =>
        candidate instanceof HTMLInputElement &&
        candidate.type === 'radio' &&
        candidate.name === element.name &&
        candidate.form === element.form,
    )
    return element === (group.find((radio) => radio.checked) ?? group[0])
  })
}
