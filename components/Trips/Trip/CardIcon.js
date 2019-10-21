import React from 'react'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import { Button } from 'native-base'
import Colors from '../../../constants/Colors'

const CardIcon = ({ name, bottom = false, onPress }) => {
  return (
    <Button iconLeft transparent onPress={onPress}>
      <Ionicons
        name={name}
        size={30}
        color={Colors.textGray}
        style={styles(bottom).icon}
      />
    </Button>
  )
}

CardIcon.propTypes = {
  name: PropTypes.string.isRequired,
  bottom: PropTypes.bool,
  onPress: PropTypes.func,
}

const styles = bottom => ({
  icon: {
    marginBottom: bottom ? 10 : 0,
    marginRight: 20,
    marginTop: bottom ? 0 : 10,
  },
})

export default CardIcon
