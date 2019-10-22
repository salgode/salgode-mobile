export const cleanString = name => {
  console.log('aca', name)
  name = name.toLowerCase()
  name = name.replace(/á/g, 'a')
  name = name.replace(/é/g, 'e')
  name = name.replace(/í/g, 'i')
  name = name.replace(/ó/g, 'o')
  name = name.replace(/ú/g, 'u')
  name = name.replace(/[`~!@#¡$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '') // remove special chars
  console.log('eso', name)
  return name
}
