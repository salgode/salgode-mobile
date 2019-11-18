import React, { Component } from 'react'
<<<<<<< e1b3fbfc3f34d5cb93a05b31da80be3e62530b42
import { SafeAreaView, StyleSheet, Alert, AsyncStorage } from 'react-native'
=======
import { SafeAreaView, StyleSheet, Alert } from 'react-native'
>>>>>>> fix: async storage imports
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import { getOwnProfile } from '../redux/actions/user'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-community/async-storage'

class ResolveUserScreen extends Component {
  constructor(props) {
    super(props)
    this.userHandler = this.userHandler.bind(this)
  }

  async userHandler() {
    const { user, loadUser } = this.props
    if (user && user.token) {
      const response = await loadUser(user.token)
      if (response.error) {
        Alert.alert(
          'Error al iniciar sesión',
          'Hubo un problema al iniciar sesión por favor intente de nuevo.',
          [
            {
              text: 'Intentar de nuevo',
              onPress: () => {
                AsyncStorage.removeItem('@userToken')
                AsyncStorage.removeItem('@userId')
                this.props.navigation.navigate('Login')
              },
            },
          ]
        )
      } else {
        this.props.navigation.navigate('ResolveCurrentTripScreen')
        return
      }
    }
    this.props.navigation.navigate('Login')
  }

  componentDidMount() {
    this.userHandler()
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

ResolveUserScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = dispatch => ({
  loadUser: token => dispatch(getOwnProfile(token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolveUserScreen)
