// Phone

export function formatPhone(phone) {
  if (typeof phone === 'string') {
    const phoneWithoutSpaces = phone.replace(/ /g, '')
    let finalPhone = ''
    const offset = phoneWithoutSpaces.slice(0, 1) === '+' ? [3, 4, 8] : [1, 5]
    for (const index in phoneWithoutSpaces) {
      if (offset.includes(parseInt(index))) {
        finalPhone = finalPhone.concat(' ')
      }
      finalPhone = finalPhone.concat(phoneWithoutSpaces[parseInt(index)])
    }
    return finalPhone
  }
  return phone
}

export function maxLengthPhone(phone) {
  if (typeof phone === 'string' && phone.slice(0, 1) === '+') {
    return 12 + 3 // 3 Spaces
  } else {
    return 9 + 2 // 2 Spaces
  }
}

export function notWrongPhone(phone) {
  if (!phone) {
    return true
  }
  const phoneWithoutSpaces = phone.replace(/ /g, '')
  if (phoneWithoutSpaces.length < 4) {
    return /^(\+|\+5|\+56)$/g.test(phoneWithoutSpaces)
  }
  return /^\+569[0-9]*$/g.test(phoneWithoutSpaces)
}

export function validPhone(phone) {
  if (!phone) {
    return false
  }
  const phoneWithoutSpaces = phone.replace(/ /g, '')
  return /^(\+[0-9]{11}|[0-9]{9})$/g.test(phoneWithoutSpaces)
}

// Plate

export function validPlate(plate) {
  return /^([a-zA-Z]{4}[0-9]{2}|[a-zA-Z]{2}[0-9]{4})$/i.test(plate)
}

export function notWrongPlate(plate) {
  return /^[a-zA-Z]{0,4}[0-9]{0,4}$/i.test(plate) && !/^([a-zA-Z]{3}[0-9]{1,3}|[a-zA-Z]{1}[0-9]{1,5})$/i.test(plate) && !/^[0-9]+/i.test(plate)
}
