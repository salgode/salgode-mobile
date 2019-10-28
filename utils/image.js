import axios from 'axios'

const uploadFile = async ref => {
  const file = ref.current.files[0]
  const fileParts = file.name.split('.')
  const fileName = fileParts[0]
  const fileType = fileParts[1]
  try {
    const res = await axios.post(
      `https://api.salgode.com/upload/image`,
      {
        file_name: fileName + '.' + fileType.toLowerCase(),
        file_type: fileType,
      }
    )
    try {
      const data = res.data.image_urls.upload
      const signedRequest = data
      const options = {
        headers: {
          'Content-Type': fileType,
        },
      }
      await axios.put(signedRequest, file, options)
      return res.data
    } catch (error) {
      return { err: error }
    }
  } catch (error) {
    return { err: error }
  }
}
export default uploadFile
