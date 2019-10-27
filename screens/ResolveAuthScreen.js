import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, AsyncStorage, Alert } from 'react-native'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import { getOwnProfile } from '../redux/actions/user'
import PropTypes from 'prop-types'

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
    let userId = await AsyncStorage.getItem('@userId')
    // console.log(userToken, userId)

    if (
      !userToken ||
      !userId ||
      userToken === 'undefined' ||
      userId === 'undefined'
    ) {
      this.props.navigation.navigate('Login')
    } else {
      userToken = JSON.parse(userToken)
      userId = JSON.parse(userId)
      this.setState({
        loading: true,
      })

      const user = await this.props
        .loadUser(userToken, userId)
        .then(response => {
          return response
        })
      if (user.error) {
        Alert.alert(
          'Error al iniciar sesión',
          'Hubo un problema con iniciar sesión por favor intente de nuevo.',
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
      }
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
}

const mapDispatchToProps = dispatch => ({
  loadUser: (token, id) => dispatch(getOwnProfile(token, id)),
})

export default connect(
  null,
  mapDispatchToProps
)(ResolveAuthScreen)
