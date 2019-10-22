import _ from 'lodash'

export const spotsFilter = (spots, filters) => {
  const result = spots.filter(slot => {
    for (const elem of filters) {
      if (_.isEqual(slot, elem)) {
        return false
      }
    }
    return true
  })
  return result
}
