import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import UsernameIcon from '../assets/icons/UsernameIcon';
import PasswordIcon from '../assets/icons/PasswordIcon';
import OpenEyeIcon from '../assets/icons/OpenEyeIcon';
import ClosedEyeIcon from '../assets/icons/ClosedEyeIcon';

import useAuth from '../utility/Auth';

import { auth } from '../utility/firebase';

const LoginScreen = ({navigation}) =>  {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [passwordSecure, setPasswordSecure] = useState(true)

  // const { Login } = useAuth();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>KHANA RECIPE</Text>
        <Text style={styles.slogan}>Cook in easy way</Text>
      </View>

      <Text style={styles.explanation}>Login</Text>

      <View>
        <View style={styles.inputContainer}>
          <UsernameIcon/>
          <TextInput value={username} onChangeText={setUsername} style={styles.textInput} placeholderTextColor={'#ffffff'} placeholder="Username" />
        </View>

        <View style={styles.inputContainer}>
          <PasswordIcon/>
          <TextInput value={password} onChangeText={setPassword} style={styles.textInput} placeholderTextColor={'#ffffff'} placeholder="Password" secureTextEntry={passwordSecure} />
          <TouchableOpacity
            onPress={() => {
              setPasswordSecure(!passwordSecure)
            }}
          >
            {passwordSecure ? <ClosedEyeIcon/> : <OpenEyeIcon/> }
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('does nothing');  
          }}
          style={styles.forgotPasswordContaintainer}
        >
          <Text style={styles.pressableText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        onPress={() => {
          if (username.length > 0 && password.length > 0) {
            auth().signInWithEmailAndPassword(username, password)
          }
          // Login(username, password)
        }} 
        style={styles.loginButton}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Not yet Registered?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RegisterScreen')
          }}
        >
          <Text style={styles.pressableText}>Register Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    backgroundColor: '#1E1E1E'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  slogan: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  explanation: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
  },
  forgotPasswordContaintainer: {
    alignSelf: 'flex-end',
  },
  loginButton: {
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
  },
  pressableText: {
    color: '#FF6B00',
    marginLeft: 5,
  },
});

export default LoginScreen;
