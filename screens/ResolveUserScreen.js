import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, AsyncStorage, Alert } from 'react-native'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import { getOwnProfile, setToken } from '../redux/actions/user'
import PropTypes from 'prop-types'

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
