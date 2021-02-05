import React, { useState } from 'react'
import { ToastAndroid, Button } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PropTypes from 'prop-types'

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singup = () => {
    // TODO: Validation

    // eslint-disable-next-line no-undef
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
          // eslint-disable-next-line no-else-return
        } else if (response.status === 400) {
          // eslint-disable-next-line no-throw-literal
          throw 'Invalid email or password'
        } else {
          // eslint-disable-next-line no-throw-literal
          throw 'Something went wrong'
        }
      })
      .then(async (responseJson) => {
        // console.log(responseJson);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        // const value = await AsyncStorage.getItem('@session_token');
        // console.log(value)
        props.navigation.navigate('homeNavigator');
      })
      .catch((error) => {
        // console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      })
  }

  return (
    <ScrollView>
      <TextInput
        text="fake@mail.com"
        placeholder="Enter your email..."
        onChangeText={value => setEmail(value)}
        value={email}
        style={{ padding: 5, borderWidth: 1, margin: 5 }}
      />
      <TextInput
      text="hello123"
        placeholder="Enter your password..."
        onChangeText={value => setPassword(value)}
        value={password}
        style={{ padding: 5, borderWidth: 1, margin: 5 }}
      />
      <Button
        title="Login"
        onPress={() => singup()}
      />
    </ScrollView>
  )
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default LoginScreen