import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, AsyncStorage, Alert } from 'react-native'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import { fetchUser } from '../redux/actions/user'

class ResolveAuthScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.loginHandler = this.loginHandler.bind(this)
  }

  async loginHandler() {
    const userToken = await AsyncStorage.getItem('@userToken')
    const userId = await AsyncStorage.getItem('@userId')

    if (!userToken || !userId) {
      this.props.navigation.navigate('LoginStack')
    } else {
      this.setState({
        loading: true,
      })

      const user = await this.props.login(userToken, userId).then(response => {
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
                this.props.navigation.navigate('LoginStack')
              },
            },
          ]
        )
      } else {
        this.props.navigation.navigate('Main')
      }
    }
  }

  render() {
    !this.state.loading && this.loginHandler()
    if (this.state.loading) {
      return (
        <SafeAreaView style={styles.container}>
          <Spinner color="blue" />
        </SafeAreaView>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(fetchUser(email, password)),
})

export default connect(
  null,
  mapDispatchToProps
)(ResolveAuthScreen)
