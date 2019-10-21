import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Spinner, View } from 'native-base'
import PropTypes from 'prop-types'
import { setUser } from '../redux/actions/user'
import SignupForm from '../components/Login/SignupForm'
import { signupAsync } from '../utils/login'

class SignupScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.onSend = this.onSend.bind(this)
  }

  async onSend(userInfo) {
    this.setState({ loading: true })
    const user = await signupAsync(userInfo)
    this.setState({ loading: false })
    if (!user) {
      alert('Hubo un problema registrandote. Por favor intentalo de nuevo.')
    } else if (!user.email) {
      alert(
        'Las credenciales ingresadas son inválidas. Por favor intentalo de nuevo.'
      )
    } else {
      this.props.setUser(user)
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="height" enabled>
        <ScrollView>
          <View style={styles.container}>
            <SignupForm onSend={this.onSend} />
            {this.state.loading && <Spinner />}
          </View>
          {this.state.loading && <Spinner />}
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

SignupScreen.propTypes = {
  setUser: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
})

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
})

export default connect(
  null,
  mapDispatchToProps
)(SignupScreen)
