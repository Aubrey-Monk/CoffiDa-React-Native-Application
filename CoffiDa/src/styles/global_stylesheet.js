import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  flexContainer: {
    flex: 1,
  },

  scrollView: {
    flexGrow: 1,
  },

  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewOne: {
    flex: 3,
    padding: '5%',
    justifyContent: 'space-evenly',
  },

  viewTwo: {
    flex: 1,
    justifyContent: 'space-evenly',
  },

  twoButtonViewOne: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  twoButtonViewTwo: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  button: {
    borderRadius: 20,
    height: '40%',
    margin: '7%',
  },

  alternativeButton: {
    borderRadius: 20,
    height: '30%',
    margin: '7%',
  },

  buttonContent: {
    borderRadius: 20,
    height: '100%',
  },

  imgView: {
    overflow: 'hidden',
    borderWidth: 3,
  },

  reviewBody: {
    textAlign: 'center',
  },

  reviewOpacity: {
    padding: '10%',
    borderWidth: 3,
    borderRadius: 20,
    margin: '5%',
  },

  reviewBodyInput: {
    borderWidth: 3,
    marginTop: '3%',
    borderRadius: 30,
    borderColor: 'transparent',
  },

  reviewText: {
    textAlign: 'center',
    fontSize: 15,
    paddingBottom: '1%',
    paddingTop: '1%',
  },

  reviewSubmitButton: {
    borderRadius: 20,
    height: '70%',
    margin: '5%',
    borderWidth: 3,
    marginBottom: '10%',
  },
});
