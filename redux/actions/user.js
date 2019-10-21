export const actions = {
  USER_LOGIN: 'USER/LOGIN',
  USER_LOGIN_FAIL: 'USER/LOGIN_FAIL',
  USER_LOGIN_SUCESS: 'USER/LOGIN_SUCCESS',
}

export function loginUser(email, password) {
  return {
    type: actions.USER_LOGIN,
    payload: {
      request: {
        url: `/users/login`,
        method: 'post',
        data: {
          email,
          password,
        },
      },
    },
  }
}
