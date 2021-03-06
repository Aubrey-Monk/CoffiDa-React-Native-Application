import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfo = async (props) => {
  const token = await AsyncStorage.getItem('@session_token');
  const id = await AsyncStorage.getItem('@user_id');

  // eslint-disable-next-line no-undef
  return fetch(`http://10.0.2.2:3333/api/1.0.0/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      if (response.status === 401) {
        props.navigation.navigate('Welcome');
        throw new Error('You are not logged in - redirecting...');
      }
      if (response.status === 404) {
        throw new Error('Not Found.');
      }
      if (response.status === 500) {
        throw new Error('Server Error.');
      } else {
        throw new Error('Something went wrong.');
      }
    })
    .catch((error) => {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    });
};

export default UserInfo;
