import * as React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'

const EmptyState = (props) => {
  const { image, text } = props
  return (
    <View style={styles.emptyStateMainContainer}>
      <Image source={image} resizeMode="contain" style={styles.emptyStateImage} />
      <Text style={styles.emptyStateText}>{text}</Text>
    </View>
  )
}

EmptyState.propTypes = {
  image: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  emptyStateMainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  emptyStateImage: {
    width: 79,
    height: 59,
    opacity: 0.4,
  },
  emptyStateText: {
    fontSize: 12,
    color: Colors.textGray,
    marginTop: 20,
    opacity: 0.8,
  },
})

export default EmptyState
