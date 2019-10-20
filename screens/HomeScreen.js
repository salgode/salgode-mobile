import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Alert, Button } from 'react-native'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/user'

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Button
              title="Inicia sesión"
              onPress={() =>
                this.props
                  .loginUser('mandrade2@uc.cl', '123')
                  .then(data => console.log(data))
              }
            />

            <Button
              title="Crea una cuenta"
              onPress={() => Alert.alert('Simple Button pressed')}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },

  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
})

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  loginUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
