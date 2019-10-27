import { getDefaultHeaders, getBaseHeaders, urls } from '../../config/api'

export const actions = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_SIGNUP: 'USER_SIGNUP',
  USER_SIGNUP_FAIL: 'USER_SIGNUP_FAIL',
  USER_SIGNUP_SUCCESS: 'USER_SIGNUP_SUCCESS',
  USER_UPDATE: 'USER_UPDATE',
  USER_UPDATE_FAIL: 'USER_UPDATE_FAIL',
  USER_UPDATE_SUCCESS: 'USER_UPDATE_SUCCESS',
  USER_SIGNOUT: 'USER_SIGNOUT',
  USER_UPLOAD_IMAGE: 'USER_UPLOAD_IMAGE',
  USER_UPLOAD_IMAGE_FAIL: 'USER_UPLOAD_IMAGE_FAIL',
  USER_UPLOAD_IMAGE_SUCCESS: 'USER_UPLOAD_IMAGE_SUCCESS',
  USER_GET_TRIPS: 'USER_GET_TRIPS',
  USER_GET_TRIPS_FAIL: 'USER_GET_TRIPS_FAIL',
  USER_GET_TRIPS_SUCCESS: 'USER_GET_TRIPS_SUCCESS',
  USER_DRIVER_GET_TRIPS: 'USER_DRIVER_GET_TRIPS',
  USER_DRIVER_GET_TRIPS_FAIL: 'USER_DRIVER_GET_TRIPS_FAIL',
  USER_DRIVER_GET_TRIPS_SUCCESS: 'USER_DRIVER_GET_TRIPS_SUCCESS',
  USER_GET_CARS: 'USER_GET_CARS',
  USER_GET_CARS_FAIL: 'USER_GET_CARS_FAIL',
  USER_GET_CARS_SUCCESS: 'USER_GET_CARS_SUCCESS',
  USER_SET: 'USER_SET',
  USER_GET_CAR: 'USER_GET_CAR',
  USER_GET_CAR_FAIL: 'USER_GET_CAR_FAIL',
  USER_GET_CAR_SUCCESS: 'USER_GET_CAR_SUCCESS',
  USER_GET_CURRENT_TRIP: 'USER_GET_CURRENT_TRIP',
  USER_GET_CURRENT_TRIP_FAIL: 'USER_GET_CURRENT_TRIP_FAIL',
  USER_GET_CURRENT_TRIP_SUCCESS: 'USER_GET_CURRENT_TRIP_SUCCESS',
  USER_CREATE_VEHICLE: 'USER_CREATE_VEHICLE',
  USER_CREATE_VEHICLE_FAIL: 'USER_CREATE_VEHICLE_FAIL',
  USER_CREATE_VEHICLE_SUCCESS: 'USER_CREATE_VEHICLE_SUCCESS',
}

const mapDataToUser = data => {
  // console.log(data)
  const user = {
    token: data.bearer_token,
    name: data.first_name,
    userId: data.user_id,
    lastName: data.last_name,
    email: data.email,
    phone: data.phone,
    user_verifications: {
      driver_license: data.user_verifications.driver_license,
    },
    vehicles: data.vehicles,
  }

  const { user_identifications } = data
  if (user_identifications) {
    const { selfie, identification, driver_license } = user_identifications
    Object.assign(user, {
      avatar: selfie,
      dni: {
        front: identification.front,
        back: identification.back,
      },
      license: {
        front: driver_license.front,
        back: driver_license.back,
      },
    })
  }
  return user
}

export function loginUser(email, password) {
  return {
    type: actions.USER_LOGIN,
    payload: {
      request: {
        url: urls.session.post.signin(),
        method: 'post',
        headers: getDefaultHeaders(),
        data: {
          email,
          password,
        },
        transformResponse: mapDataToUser,
      },
    },
  }
}

export function signupUser(
  name,
  lastName,
  email,
  phone,
  password,
  passwordRepeat,
  selfieLink = 'placeholder',
  identification_image_front = 'placeholder',
  identification_image_back = 'placeholder'
) {
  const data = {
    email,
    last_name: lastName,
    first_name: name,
    phone,
    password,
    passwordRepeat,
    user_identifications: {
      selfie_image: selfieLink,
      identification_image_front,
      identification_image_back,
    },
  }
  return {
    type: actions.USER_SIGNUP,
    payload: {
      request: {
        url: urls.session.post.register(),
        method: 'post',
        headers: getDefaultHeaders(),
        data: data,
        transformResponse: mapDataToUser,
      },
    },
  }
}

export function updateUser(authToken, data) {
  return {
    type: actions.USER_UPDATE,
    payload: {
      request: {
        url: urls.user.info.put.edit(),
        method: 'put',
        headers: getBaseHeaders(authToken),
        data,
      },
    },
  }
}

export function signoutUser() {
  return {
    type: actions.USER_SIGNOUT,
    payload: {
      user: {},
    },
  }
}

export function fetchUser(authToken, id) {
  return {
    type: actions.USER_LOGIN,
    payload: {
      request: {
        url: urls.user.info.get.profile(id),
        method: 'get',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}

export function getOwnProfile(token, userId) {
  return {
    type: actions.USER_LOGIN,
    payload: {
      request: {
        url: urls.user.info.get.own_profile(userId),
        method: 'get',
        headers: getBaseHeaders(token),
        transformResponse: data => ({
          ...mapDataToUser(data),
          userId: userId,
          token: token,
        }),
      },
    },
  }
}

export function uploadImageUser(base64string) {
  return {
    type: actions.USER_UPLOAD_IMAGE,
    payload: {
      request: {
        url: urls.user.images.post.upload(),
        method: 'post',
        data: {
          base64string: `data:image/jpeg;base64,${base64string}`,
        },
        transformResponse: data => {
          return {
            img_id: data.img_id,
          }
        },
      },
    },
  }
}

export function userTrips(authToken) {
  return {
    type: actions.USER_GET_TRIPS,
    payload: {
      request: {
        url: urls.user.trips.get.all(),
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}

export function driverTrips(authToken) {
  return {
    type: actions.USER_DRIVER_GET_TRIPS,
    payload: {
      request: {
        url: urls.driver.trips.get.all(),
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}

export function getUserCars(authToken) {
  return {
    type: actions.USER_GET_CARS,
    payload: {
      request: {
        url: urls.user.vehicles.get.all(),
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}

export function getCurrentTrip(authToken) {
  return {
    type: actions.USER_GET_CURRENT_TRIP,
    payload: {
      request: {
        url: urls.user.trips.get.current(),
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}

export function getUserCar(authToken, carId) {
  return {
    type: actions.USER_GET_CAR,
    payload: {
      request: {
        url: urls.user.vehicles.get.single(carId),
        method: 'get',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}

export function createVehicle(authToken, data) {
  return {
    type: actions.USER_CREATE_VEHICLE,
    payload: {
      request: {
        url: urls.user.vehicles.post.create(),
        method: 'post',
        headers: getBaseHeaders(authToken),
        data,
      },
    },
  }
}
