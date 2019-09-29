import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

export default StyleSheet.create({
  card: {
    /*
      Setting the height according to the screen height,
      also could be fixed value orbased on percentage.
      In this example this worked well on Android and iOS.
    */
    height: height - 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: '100%',
  },
  photoDescriptionContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
    top: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    color: 'black',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
  },
})
