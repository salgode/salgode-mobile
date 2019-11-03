import React, { Component } from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import DetailedTrip from "../components/Trips/Trip/DetailedTrip";
import { Spinner } from "native-base";
import TripRequestCard from "../components/Trips/Trip/TripRequestCard";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import {
  fetchTrip,
  startJourney,
  fetchTripManifest
} from "../redux/actions/trips";
import { getTripReservations } from "../utils/getTripInfo";

class DetailedTripScreen extends Component {
  static navigationOptions = {
    title: "Mis Viajes"
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      trip: null,
      reservations: [],
      asDriver: false
    };

    this.renderPassengers = this.renderPassengers.bind(this);
    this.onPressStartTrip = this.onPressStartTrip.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const asDriver = this.props.navigation.getParam("asDriver", null);
    const trip_id = this.props.navigation.getParam("trip_id", null);
    this.props.fetchTrip(this.props.user.token, trip_id);
    this.props.fetchManifest(this.props.user.token, trip_id);
    this.setState({ ...this.state, asDriver });

    if (asDriver) {
      const reservations = await getTripReservations(
        this.props.user.token,
        trip_id
      );
      this.setState({ loading: false });
      if (!reservations || reservations.message) {
        alert(
          "Hubo un problema obteniendo las reservas. Por favor intentalo de nuevo."
        );
      } else {
        this.setState({ reservations });
      }
    } else {
      this.setState({ loading: false });
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.trip !== prevState.trip) {
      return { trip: nextProps.trip };
    }
    if (nextProps.trip.manifest !== prevState.trip.manifest) {
      return { trip: { ...prevState.trip, manifest: nextProps.trip.manifest } };
    }
    return null;
  }
  onPressStartTrip() {
    this.props.navigation.navigate("StartTrip", {
      stops: this.state.trip.trip_route_points,
      onTripStart: () =>
        this.props.postTripStart(
          this.props.user.token,
          this.state.trip.trip_id
        ),
      nextTripView: () => {
        this.props.navigation.navigate("StopTrip", {
          token: this.props.user.token,
          trip: this.state.trip,
          asDriver: this.props.navigation.getParam("asDriver", null)
        });
      }
    });
  }

  renderPassengers() {
    if (!this.state.trip) {
      return null;
    }

    const finishStop = this.state.trip.trip_route.end.name;
    return this.state.reservations.length > 0
      ? this.state.reservations.map((reservation, index) => {
          return (
            <TripRequestCard
              key={`passenger-${index}`}
              reservation={reservation}
              finishStop={finishStop}
              token={this.props.user.token}
              tripStatus={this.state.trip.trip_status}
            />
          );
        })
      : null;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.loading && <Spinner color="blue" />}
        {!this.state.loading && (
          <DetailedTrip
            asDriver={this.state.asDriver}
            trip={this.state.trip}
            driver={this.state.trip.driver}
            onPressStartTrip={() => this.onPressStartTrip()}
          />
        )}
        {this.state.asDriver && !this.state.loading
          ? this.renderPassengers()
          : null}
      </ScrollView>
    );
  }
}

DetailedTripScreen.propTypes = {
  asDriver: PropTypes.bool,
  tripId: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired
  }).isRequired,
  trip: PropTypes.object.isRequired,
  fetchTrip: PropTypes.func.isRequired,
  fetchManifest: PropTypes.func.isRequired,
  postTripStart: PropTypes.func.isRequired
};

DetailedTripScreen.defaultProps = {
  asDriver: false,
  tripId: "0"
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    ...StyleSheet.absoluteFill
  }
});

const mapPropsToState = state => ({
  user: state.user,
  trip: state.trips.trip,
  manifest: state.trips.trip.manifest
});

const mapDispatchToState = dispatch => ({
  fetchTrip: (token, id) => dispatch(fetchTrip(token, id)),
  postTripStart: (token, id) => dispatch(startJourney(token, id)),
  fetchManifest: (token, id) => dispatch(fetchTripManifest(token, id))
});

export default connect(
  mapPropsToState,
  mapDispatchToState
)(withNavigation(DetailedTripScreen));
