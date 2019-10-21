import BackendUrls from '../constants/BackendUrls'

export const loginAsync = async (email, password) => {
  const response = await fetch(BackendUrls.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(resp => {
      return resp.json()
    })
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err)
      return null
    })
  return response
}

export const signupAsync = async userInfo => {
  const { name, lastName, email, phone, password, passwordRepeat } = userInfo
  const response = fetch(BackendUrls.signup, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      lastName,
      email,
      phone,
      password,
      passwordRepeat,
      selfieLink: 'https://link1.com',
      driverLicenseLink: 'https://link2.com',
      dniLink: 'https://link3.com',
      car: {
        plate: 'AABB99',
        color: 'Azul',
        brand: 'Toyota',
        model: 'Yaris',
      },
    }),
  })
    .then(resp => resp.json())
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err)
      return null
    })
  return response
}
