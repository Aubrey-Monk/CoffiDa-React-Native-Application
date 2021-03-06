import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteReview = async (props, locationId, reviewId) => {
  const token = await AsyncStorage.getItem('@session_token');

  // eslint-disable-next-line no-undef
  return fetch(
    `http://10.0.2.2:3333/api/1.0.0/location/${locationId}/review/${reviewId}`,
    {
      method: 'DELETE',
      headers: {
        'X-Authorization': token,
      },
    },
  )
    .then((response) => {
      if (response.status === 200) {
        ToastAndroid.show('Review Deleted!', ToastAndroid.SHORT);
        props.navigation.navigate('homeStackNavigator', {
          screen: 'Location Info',
          params: {locationId},
        });
      }
      if (response.status === 400) {
        throw new Error('Bad Request.');
      }
      if (response.status === 401) {
        props.navigation.navigate('Welcome');
        throw new Error('You are not logged in - redirecting...');
      }
      if (response.status === 403) {
        throw new Error('Forbidden.');
      }
      if (response.status === 404) {
        throw new Error('Not Found.');
      }
      if (response.status === 500) {
        throw new Error('Server Error.');
      } else if (response.status !== 200) {
        throw new Error('Something went wrong.');
      }
    })
    .catch((error) => {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    });
};

export default DeleteReview;
