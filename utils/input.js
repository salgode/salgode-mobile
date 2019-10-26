export function formatPhone(phone) {
  let phoneWithoutSpaces = phone.replace(/ /g, '')
  let finalPhone = ''
  const offset = (phoneWithoutSpaces.slice(0, 1) === '+') ? [3, 4, 8] : [1, 5]
  for (let index in phoneWithoutSpaces) {
    if (offset.includes(parseInt(index))) {
      finalPhone = finalPhone.concat(' ')
    }
    finalPhone = finalPhone.concat(phoneWithoutSpaces[parseInt(index)])
  }
  return finalPhone
}

export function maxLengthPhone(phone) {
  if (phone.slice(0, 1) === '+') {
    return 12 + 3 // 3 Spaces
  } else {
    return 9 + 2 // 2 Spaces
  }
}

export function notWrongPhone(phone) {
  if (!phone) {
    return true
  }
  let phoneWithoutSpaces = phone.replace(/ /g, '')
  return /^\+?[0-9]*$/g.test(phoneWithoutSpaces)
}

export function validPhone(phone) {
  if (!phone) {
    return false
  }
  let phoneWithoutSpaces = phone.replace(/ /g, '')
  return /^(\+[0-9]{11}|[0-9]{9})$/g.test(phoneWithoutSpaces)
}
