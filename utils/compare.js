export const compareStrKeyAscending = key => (element1, element2) => {
  if (element1[key] < element2[key]) {
    return -1
  }
  if (element1[key] > element2[key]) {
    return 1
  }
  return 0
}
