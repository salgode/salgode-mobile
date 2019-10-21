export const actions = {
  USER_LOGIN: "USER/LOGIN",
  USER_LOGIN_FAIL: "USER/LOGIN_FAIL",
  USER_LOGIN_SUCESS: "USER/LOGIN_SUCCESS",
  USER_SIGNUP: "USER/SIGNUP",
  USER_SIGNUP_FAIL: "USER/SIGNUP_FAIL",
  USER_SIGNUP_SUCESS: "USER/SIGNUP_SUCCESS"
};

export function loginUser(email, password) {
  return {
    type: actions.USER_LOGIN,
    payload: {
      request: {
        url: `/users/login`,
        method: "post",
        data: {
          email,
          password
        }
      }
    }
  };
}

export function signupUser(
  name,
  lastName,
  email,
  phone,
  password,
  passwordRepeat
  // selfieLink,
  // driverLicenseLink,
  // dniLink,
  // carPlate,
  // carColor,
  // carBrand,
  // carModel
) {
  return {
    type: actions.USER_SIGNUP,
    payload: {
      request: {
        url: `/users`,
        method: "post",
        data: {
          name,
          lastName,
          email,
          phone,
          password,
          passwordRepeat
          // selfieLink,
          // driverLicenseLink,
          // dniLink,
          // car: {
          //   carPlate,
          //   carColor,
          //   carBrand,
          //   carModel,
          // },
        }
      }
    }
  };
}
