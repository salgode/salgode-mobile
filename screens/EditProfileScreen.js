import React from 'react'
import {
  StyleSheet,
  CheckBox,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {
  Button,
  Form,
  Input,
  Item,
  Label,
  Text,
  Content,
  Container,
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

  const photoSize = 96;

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Content>
          <View style={{ minHeight: Dimensions.get('window').height }}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: photoSize,
                  height: photoSize,
                  borderRadius: photoSize / 2,
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginHorizontal: 16,
                  marginVertical: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MaterialCommunityIcons name='face-profile' color='gray' size={photoSize} />
              </View>
              <View style={{ paddingHorizontal: 12 }}>
                <View style={{ flexDirection: 'row', paddingVertical: 8 }}>
                  <Text
                    style={[
                      styles.label,
                      {
                        paddingHorizontal: 8,
                      },
                    ]}
                  >
                    Celular
                  </Text>
                  <Text
                    style={{
                      paddingHorizontal: 8,
                    }}
                  >
                    +56976543210
                  </Text>
                </View>
                <Button
                  block
                  borderRadius={10}
                  style={styles.button}
                  disabled={true}
                  onPress={() => console.log('Cambiar contraseña')}
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox value={hasCar} onValueChange={setHasCar} />
                <Text style={{ fontSize: 16 }}>Tiene auto</Text>
              </View>
              {hasCar ? (
                <>
                  <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={{ fontSize: 20, marginBottom: 8 }}>Datos auto</Text>
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
                disabled={true}
                onPress={() => console.log('Guardar perfil')}
              >
                <Text>Guardar cambios</Text>
              </Button>
            </Form>
          </View>
          <View style={{ height: 128 }} />
        </Content>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
EditProfileScreen.navigationOptions = {
  title: 'Editar Perfil',
}
export default EditProfileScreen

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  form: {
    alignItems: 'center',
    height: 250,
    margin: 15,
  },
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
})
