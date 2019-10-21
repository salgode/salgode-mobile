import React from 'react'
import { View, Text } from 'native-base'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'

const IconWithText = ({
  containerStyle = staticStyles.container,
  textStyle = staticStyles.text,
  iconName,
  text,
  iconSize = 30,
  iconColor = Colors.textGray,
}) => {
  return (
    <View style={containerStyle}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
      <Text style={textStyle}>{text}</Text>
    </View>
  )
}

IconWithText.propTypes = {
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  iconName: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
}

const staticStyles = {
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 17,
    marginLeft: 15,
  },
}

export default IconWithText
