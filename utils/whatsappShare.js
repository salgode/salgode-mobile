import { Linking } from 'react-native'

export const shareToWhatsApp = (text, phoneNumber) => {
  Linking.openURL(`whatsapp://send?text=${text}&phone=${phoneNumber}`)
}
