import React from 'react'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'

const CardIcon = ({ name, bottom = false }) => {
  return (
    <Ionicons
      name={name}
      size={30}
      color={Colors.textGray}
      style={styles(bottom).icon}
    />
  )
}

CardIcon.propTypes = {
  name: PropTypes.string.isRequired,
  bottom: PropTypes.bool,
}

const styles = bottom => ({
  icon: {
    marginBottom: bottom ? 10 : 0,
    marginRight: 20,
    marginTop: bottom ? 0 : 10,
  },
})

export default CardIcon
