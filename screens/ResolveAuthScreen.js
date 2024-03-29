import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, AsyncStorage } from 'react-native'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import { getOwnProfile, setToken } from '../redux/actions/user'
import PropTypes from 'prop-types'
import { Notifications } from 'expo'
import { handleNotification } from '../utils/notifications'

class ResolveAuthScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.loginHandler = this.loginHandler.bind(this)
  }

  async loginHandler() {
    let userToken = await AsyncStorage.getItem('@userToken')
    const userId = await AsyncStorage.getItem('@userId')

    if (
      !userToken ||
      !userId ||
      userToken === undefined ||
      userId === undefined
    ) {
      this.props.navigation.navigate('Login')
    } else {
      userToken = JSON.parse(userToken)
      await this.props.storeToken(userToken)
      Notifications.addListener(handleNotification(this.props.navigation))
      this.props.navigation.navigate('ResolveUserScreen')
    }
  }

  componentDidMount() {
    this.loginHandler()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner color="blue" />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

ResolveAuthScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  loadUser: PropTypes.func.isRequired,
  storeToken: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  loadUser: (token, id) => dispatch(getOwnProfile(token, id)),
  storeToken: token => dispatch(setToken(token)),
})

export default connect(
  null,
  mapDispatchToProps
)(ResolveAuthScreen)
