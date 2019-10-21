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
