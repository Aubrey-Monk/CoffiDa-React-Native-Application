import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props, details) =>
  // eslint-disable-next-line no-undef
  fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: details.email,
      password: details.password,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 400) {
        throw new Error('Invalid email or password.');
      }
      if (response.status === 500) {
        throw new Error('Server Error.');
      } else {
        throw new Error('Something went wrong.');
      }
    })
    .then(async (responseJson) => {
      await AsyncStorage.setItem('@session_token', responseJson.token);
      await AsyncStorage.setItem('@user_id', JSON.stringify(responseJson.id));

      props.navigation.navigate('homeTabNavigator');
    })
    .catch((error) => {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    });

export default Login;
