import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native'

import RecoverPasswordForm from '../components/Login/RecoverPasswordForm';

 class RecoverPasswordScreen extends Component {
    static navigationOptions = {
        title: 'Recuperar contraseña',
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
        
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <RecoverPasswordForm />
            </KeyboardAvoidingView>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      },
})

export default RecoverPasswordScreen;