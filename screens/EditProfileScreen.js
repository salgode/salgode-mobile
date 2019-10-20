import React from 'react'
import {
  StyleSheet,
  CheckBox,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native'
import {
  Button,
  Form,
  Input,
  Item,
  Label,
  Text,
  Content,
  View,
} from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Layout from '../constants/Layout'

const EditProfileScreen = () => {
  const [name, setName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [hasCar, setHasCar] = React.useState(false)
  const [carPlate, setCarPlate] = React.useState('BC2019')
  const [carColor, setCarColor] = React.useState('Gris')
  const [carBrand, setCarBrand] = React.useState('Nissan')
  const [carModel, setCarModel] = React.useState('Sportage')

  const [isLoading, setIsLoading] = React.useState(true)
  const [loadErr, setLoadErr] = React.useState(null)

  const [isSaving, setIsSaving] = React.useState(false)
  const [saveErr, setSaveErr] = React.useState(null)

  const commonFields = [
    { label: 'Nombre', value: name, setValue: setName },
    { label: 'Apellido', value: lastName, setValue: setLastName },
  ]
  const carFields = [
    { label: 'Patente', value: carPlate, setValue: setCarPlate },
    { label: 'Color', value: carColor, setValue: setCarColor },
    { label: 'Marca', value: carBrand, setValue: setCarBrand },
    { label: 'Modelo', value: carModel, setValue: setCarModel },
  ]

  const user = {
    name,
    lastName,
    car: hasCar
      ? {
          plate: carPlate,
          color: carColor,
          brand: carBrand,
          model: carModel,
        }
      : null,
  }

  React.useEffect(() => {
    const loadUser = async () => {
      // TODO: remove this and load user from backend
      return await new Promise(resolve => {
        const hardcodedUser = {
          name: 'Juan',
          lastName: 'Pérez',
          car: {
            plate: 'BC2019',
            color: 'Gris',
            brand: 'Nissan',
            model: 'Sportage',
          },
        }
        const hardcodedTimeout = 1000
        setTimeout(() => resolve(hardcodedUser), hardcodedTimeout)
      })
    }

    loadUser()
      .then(user => {
        setName(user.name)
        setLastName(user.lastName)
        if (user.car != null) {
          setCarPlate(user.car.plate)
          setCarColor(user.car.color)
          setCarBrand(user.car.brand)
          setCarModel(user.car.model)
        }

        setIsLoading(false)
      })
      .catch(err => {
        setLoadErr(err)
        setIsLoading(false)
      })
  }, [])

  React.useEffect(() => {
    if (saveErr != null) {
      Alert.alert(
        'Error al cargar usuario',
        JSON.stringify(loadErr, null, '  ')
      )
    }
  }, [loadErr])

  const onPressSaveProfile = React.useCallback(() => {
    const saveProfile = async () => {
      // TODO: remove this and send `user` to backend here
      Alert.alert(
        'No implementado',
        'user = ' + JSON.stringify(user, null, '  ')
      )
    }

    setIsSaving(true)
    saveProfile()
      .then(() => setIsSaving(false))
      .catch(err => {
        setSaveErr(err)
        setIsSaving(false)
      })
  }, [user])

  React.useEffect(() => {
    if (saveErr != null) {
      Alert.alert(
        'Error al guardar perfil',
        JSON.stringify(saveErr, null, '  ')
      )
    }
  }, [saveErr])

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="orange" />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.flex1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Content>
          <View style={{ minHeight: Dimensions.get('window').height }}>
            <View style={styles.row}>
              <View style={styles.profilePhoto}>
                <MaterialCommunityIcons
                  name="face-profile"
                  color="gray"
                  size={photoSize}
                />
              </View>
              <View style={styles.readonlyFieldsContainer}>
                <View style={styles.readonlyField}>
                  <Text style={[styles.label, styles.readonlyFieldText]}>
                    Celular
                  </Text>
                  <Text style={styles.readonlyFieldText}>+56976543210</Text>
                </View>
                <Button
                  block
                  borderRadius={10}
                  style={styles.button}
                  disabled={true}
                  onPress={() => {}}
                >
                  <Text>Cambiar contraseña</Text>
                </Button>
              </View>
            </View>
            <Form style={styles.form}>
              {commonFields.map(field => (
                <Item key={field.label} inlineLabel regular style={styles.item}>
                  <Label style={styles.label}>{field.label}</Label>
                  <Input
                    style={styles.input}
                    onChangeText={field.setValue}
                    value={field.value}
                  />
                </Item>
              ))}
              <View style={styles.rowCenter}>
                <CheckBox value={hasCar} onValueChange={setHasCar} />
                <Text style={styles.checkboxLabel}>Tiene auto</Text>
              </View>
              {hasCar ? (
                <>
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Datos auto</Text>
                  </View>
                  {carFields.map(field => (
                    <Item
                      key={field.label}
                      inlineLabel
                      regular
                      style={styles.item}
                    >
                      <Label style={styles.label}>{field.label}</Label>
                      <Input
                        style={styles.input}
                        onChangeText={field.setValue}
                        value={field.value}
                      />
                    </Item>
                  ))}
                </>
              ) : null}
              <Button
                block
                borderRadius={10}
                style={styles.button}
                disabled={isSaving}
                onPress={onPressSaveProfile}
              >
                <Text>Guardar cambios</Text>
              </Button>
            </Form>
          </View>
          <View style={styles.artificialKeyboardPadding} />
        </Content>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
EditProfileScreen.navigationOptions = {
  title: 'Editar Perfil',
}
export default EditProfileScreen

const photoSize = 96

const styles = StyleSheet.create({
  artificialKeyboardPadding: { height: 128 },
  button: {
    marginTop: 20,
  },
  checkboxLabel: { fontSize: 16 },
  flex1: {
    flex: 1,
  },
  form: {
    alignItems: 'center',
    height: 250,
    margin: 15,
  },
  headerText: { fontSize: 20, marginBottom: 8 },
  headerTextContainer: { alignSelf: 'flex-start' },
  input: {
    width: Layout.window.width * 0.85,
  },
  item: {
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    color: '#8c8c8c',
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
    paddingHorizontal: 8,
  },
  readonlyFieldsContainer: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
