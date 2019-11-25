import { promiseXMLHttpRequest } from './xmlhttprequest'

export const uploadImageToS3 = async (signedRequest, fileType, uri) => {
  if (signedRequest && fileType && uri) {
    const response = await promiseXMLHttpRequest({
      url: signedRequest,
      method: 'put',
      headers: {
        'X-Amz-ACL': 'public-read',
        'Content-Type': fileType.toUpperCase(),
      },
      body: {
        uri,
        type: fileType,
        name: `picture.${fileType}`,
      },
    })
    return response.status === 200
  }
  return false
}
