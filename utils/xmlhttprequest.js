export function promiseXMLHttpRequest({ url, method, headers, body }) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(method.toUpperCase(), url)
    if (headers) {
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })
    }
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({
          status: xhr.status,
          statusText: xhr.statusText,
        })
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        })
      }
    }
    xhr.onerror = function() {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      })
    }
    xhr.send(body)
  })
}
