export const getDefaultHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})

export const getAuthHeader = token => ({
  Authorization: `Bearer ${token}`,
})

export const getBaseHeaders = token => ({
  ...getDefaultHeaders(),
  ...getAuthHeader(token),
})
