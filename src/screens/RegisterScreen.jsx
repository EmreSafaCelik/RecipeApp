import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import UsernameIcon from '../assets/icons/UsernameIcon';
import EmailIcon from '../assets/icons/EmailIcon';
import PasswordIcon from '../assets/icons/PasswordIcon';
import OpenEyeIcon from '../assets/icons/OpenEyeIcon';
import ClosedEyeIcon from '../assets/icons/ClosedEyeIcon';

// import useAuth from '../utility/Auth';

import { auth } from '../utility/firebase';

const RegisterScreen = ({navigation}) =>  {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [passwordSecure, setPasswordSecure] = useState(true)
  const [passwordConfirmSecure, setPasswordConfirmSecure] = useState(true)

  // const { Register } = useAuth();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>KHANA RECIPE</Text>
        <Text style={styles.slogan}>Cook in easy way</Text>
      </View>

      <Text style={styles.explanation}>Register</Text>

      <View>
        <View style={styles.inputContainer}>
          <UsernameIcon/>
          <TextInput value={username} onChangeText={setUsername} style={styles.textInput} placeholderTextColor={'#ffffff'} placeholder="Username" />
        </View>

        <View style={styles.inputContainer}>
          <EmailIcon/>
          <TextInput value={email} onChangeText={setEmail} style={styles.textInput} placeholderTextColor={'#ffffff'} placeholder="Email" />
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

        <View style={styles.inputContainer}>
          <PasswordIcon/>
          <TextInput value={confirmPassword} onChangeText={setConfirmPassword} style={styles.textInput} placeholderTextColor={'#ffffff'} placeholder="Confirm Password" secureTextEntry={passwordConfirmSecure} />
          <TouchableOpacity
            onPress={() => {
              setPasswordConfirmSecure(!passwordConfirmSecure)
            }}
          >
            {passwordConfirmSecure ? <ClosedEyeIcon/> : <OpenEyeIcon/> }
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        onPress={async () => {
          try {
            // firebase kullanıcı adı ile giriş yapmak için destek sağlamıyor 
            if (confirmPassword === password && username.length > 0 && email.length > 0 && password.length > 0) {
              let result = await auth().createUserWithEmailAndPassword(email, password)
              auth().currentUser.sendEmailVerification()
              console.log('result:', result)
            }
          } catch (error) {
            Alert.alert(error.code)
          }
          // if (Register(username, email, password, confirmPassword)) {
          //   navigation.navigate('LoginScreen')
          // }
        }} 
        style={styles.registerButton}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already Registered?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen')
          }}
        >
          <Text style={styles.loginNowText}>Login Now</Text>
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
    color: 'white'
  },
  registerButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  registerButtonText: {
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
  loginNowText: {
    color: '#FF6B00',
    marginLeft: 5,
  },
});

export default RegisterScreen;
