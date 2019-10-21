import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/user'
import { Button } from 'native-base'
import CardInput from '../components/CardInput'
import CardInputSelector from '../components/CardInputSelector'

class AddStopsScreen extends Component {
  state = {
    stops: [],
  }

  renderStops = () => {
    const { stops } = this.state
    return stops.map((stop, index) => {
      return <Text key={index}>{stop.parada}</Text>
    })
  }

  addStop = () => {}

  render() {
    const { startStop, endStop } = this.props
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.group}>
            <CardInput text={startStop} />

            <CardInput text={endStop} />
          </View>
          <View style={styles.group}>
            {this.renderStops()}
            <CardInputSelector
              text="Añande una parada"
              setValue={false}
              onSelect={item =>
                this.setState({ stops: this.state.stops.concat([item]) })
              }
            />
          </View>
        </ScrollView>

        <View>
          <Button
            block
            style={styles.addButton}
            onPress={() => console.log('')}
          >
            <Text>Crear Viaje</Text>
          </Button>
        </View>
      </View>
    )
  }
}

AddStopsScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  addButton: {
    marginBottom: 25,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  contentContainer: {
    paddingTop: 30,
  },
  group: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
})

const mapStateToProps = ({ user, createTrip }) => {
  return {
    user,
    startStop: createTrip.startStop,
    endStop: createTrip.endStop,
  }
}

const mapDispatchToProps = {
  loginUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStopsScreen)
