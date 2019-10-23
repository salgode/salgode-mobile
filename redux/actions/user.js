import { getDefaultHeaders, getBaseHeaders } from '../../config/api/headers'

export const actions = {
  USER_LOGIN: 'USER/LOGIN',
  USER_LOGIN_FAIL: 'USER/LOGIN_FAIL',
  USER_LOGIN_SUCCESS: 'USER/LOGIN_SUCCESS',
  USER_SIGNUP: 'USER/SIGNUP',
  USER_SIGNUP_FAIL: 'USER/SIGNUP_FAIL',
  USER_SIGNUP_SUCCESS: 'USER/SIGNUP_SUCCESS',
  USER_UPDATE: 'USER/UPDATE',
  USER_UPDATE_FAIL: 'USER/UPDATE_FAIL',
  USER_UPDATE_SUCCESS: 'USER/UPDATE_SUCCESS',
  USER_SIGNOUT: 'USER/SIGNOUT',
  USER_UPLOAD_IMAGE: 'USER/UPLOAD_IMAGE',
  USER_UPLOAD_IMAGE_FAIL: 'USER/UPLOAD_IMAGE_FAIL',
  USER_UPLOAD_IMAGE_SUCCESS: 'USER/UPLOAD_IMAGE_SUCCESS',
  USER_GET_TRIPS: 'USER/GET_TRIPS',
  USER_GET_TRIPS_FAIL: 'USER/GET_TRIPS_FAIL',
  USER_GET_TRIPS_SUCCESS: 'USER/GET_TRIPS_SUCCESS',
}

const mapDataToUser = data => {
  // console.log(data)
  let user = {
    token: data.bearer_token,
    //email: data.email,
    name: data.first_name,
    //lastName: data.last_name,
    //phone: data.phone,
    userId: data.user_id,
    selfie: data.avatar,
    //car: data.car,
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
        url: `/signin`,
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
  // driverLicenseLink = 'placeholder',
  dniFrontLink = 'placeholder',
  dniBackLink = 'placeholder'
  // carPlate,
  // carColor,
  // carBrand,
  // carModel
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
        url: `/sign_up`,
        method: 'post',
        headers: getDefaultHeaders(),
        data: data,
        transformResponse: data => mapDataToUser(data),
      },
    },
  }
}

export function updateUser(
  name,
  lastName,
  // email,
  phone,
  // password,
  car,
  id,
  authToken
  // passwordRepeat,
  // selfieLink = 'placeholder',
  // driverLicenseLink = 'placeholder',
  // dniFrontLink = 'placeholder',
  // dniBackLink = 'placeholder'
  // carPlate,
  // carColor,
  // carBrand,
  // carModel
) {
  const data = {
    // email,
    last_name: lastName,
    first_name: name,
    phone,
    // password,
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
        url: `/users/${id}`,
        method: 'patch',
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
        url: `/users/${id}`,
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
        url: `/upload/image`,
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
        url: `/user/trips`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
