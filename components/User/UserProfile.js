import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Thumbnail } from 'native-base'
import PropTypes from 'prop-types'
import { MaterialCommunityIcons, AntDesign, Octicons } from '@expo/vector-icons'

const photoSize = 96

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.readonlyField = this.readonlyField.bind(this)
  }

  readonlyField(label, data) {
    return (
      <View style={styles.readonlyField}>
        <Text style={[styles.label, styles.readonlyFieldText]}>{label}</Text>
        <Text style={styles.readonlyFieldText}>{data}</Text>
      </View>
    )
  }

  renderAvatar() {
    const { avatar } = this.props.user
    if (avatar) {
      return <Thumbnail source={{ uri: avatar }} large />
    } else {
      return (
        <MaterialCommunityIcons
          name="face-profile"
          color="gray"
          size={photoSize}
        />
      )
    }
  }

  renderIdentification(identificationLink, altText = '') {
    if (identificationLink) {
      return <Thumbnail square large source={{ uri: identificationLink }} />
    } else {
      return (
        <View style={styles.identificationPlaceholder}>
          <AntDesign name="idcard" color="gray" size={photoSize} />
          {altText && <Text>{altText}</Text>}
        </View>
      )
    }
  }

  renderVerification(verified, title) {
    return (
      <View style={styles.verifiedContainer}>
        <Text>{title}</Text>
        <Octicons
          name={verified ? 'verified' : 'unverified'}
          color={verified ? 'green' : 'red'}
          size={20}
        />
      </View>
    )
  }

  render() {
    const { user } = this.props

    return (
      <View>
        <View style={styles.row}>
          <View style={styles.profilePhoto}>{this.renderAvatar()}</View>
          <View style={styles.readonlyFieldsContainer}>
            {user.first_name && this.readonlyField('Nombre', user.first_name)}
            {user.last_name && this.readonlyField('Apellido', user.last_name)}
            {user.email && this.readonlyField('Email', user.email)}
            {user.phone && this.readonlyField('Celular', user.phone)}
          </View>
        </View>
        {this.renderVerification(user.dniVerified, 'Usuario verificado')}
        {this.renderVerification(user.licenceVerified, 'Conductor verificado')}
        {/* <View>
          <Text style={styles.idTitle}>Identificación de usuario</Text>
          {this.renderIdentification(user.dniFront, 'Carnet de Identidad')}
          {this.renderIdentification(user.licenceFront, 'Licencia de Conducir')}
        </View> */}
      </View>
    )
  }
}

UserProfile.propTypes = {
  // TODO: Adaptar al response del backend
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    //dniFront: Si llegamos a mostrarlo: PropTypes.string,
    //licenceFront: Si llegamos a mostrarlo: PropTypes.string,
    dniVerified: PropTypes.bool,
    licenceVerified: PropTypes.bool,
  }).isRequired,
}

const styles = StyleSheet.create({
  idTitle: {
    fontSize: 20,
    fontWeight: '500',
    margin: 20,
  },
  identificationPlaceholder: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  label: {
    color: '#8c8c8c',
    fontSize: 14,
  },
  profilePhoto: {
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: photoSize / 2,
    borderWidth: 1,
    height: photoSize,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    width: photoSize,
  },
  readonlyField: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  readonlyFieldText: {
    fontSize: 14,
    paddingHorizontal: 8,
  },
  readonlyFieldsContainer: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
  },
  thumbnail: {
    height: photoSize,
    resizeMode: 'center',
    width: photoSize,
  },
  verifiedContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default UserProfile
