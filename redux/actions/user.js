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
}

const mapDataToUser = data => {
  // console.log(data)
  let user = {
    token: data.bearer_token,
    name: data.first_name,
    userId: data.user_id,
    selfie: data.avatar,
  }
  if (data.user_identifications) {
    user = {
      ...user,
      selfieLink: data.user_identifications.selfie_image,
      dniFrontLink: data.user_identifications.identification_image_front,
      dniBackLink: data.user_identifications.identification_image_back,
    }
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
        transformResponse: data => ({
          token: data.bearer_token,
          userId: data.user_id,
          name: data.first_name,
          avatar: data.avatar,
        }),
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
  dniFrontLink = 'placeholder',
  dniBackLink = 'placeholder'
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
      identification_image_front: dniFrontLink,
      identification_image_back: dniBackLink,
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
        transformResponse: data => mapDataToUser(data),
      },
    },
  }
}

export function updateUser(name, lastName, phone, car, id, authToken) {
  const data = {
    last_name: lastName,
    first_name: name,
    phone,
  }
  if (car) {
    if (car.plate && car.color && car.brand && car.model) {
      data.car = car
    }
  }
  return {
    type: actions.USER_UPDATE,
    payload: {
      request: {
        url: urls.user.info.put.edit(),
        method: 'put',
        headers: getBaseHeaders(authToken),
        data: data,
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
