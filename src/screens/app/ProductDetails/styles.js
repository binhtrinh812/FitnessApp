import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  footer: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {},
  image: {
    width: '100%',
    height: height * 0.45,
    backgroundColor: colors.lightGrey,
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -40,
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: '500',
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    color: colors.textGrey,
    fontWeight: '300',
    marginVertical: 8,
  },
  bookmarkContainer: {
    backgroundColor: colors.lightGrey,
    padding: 18,
    borderRadius: 8,
    marginRight: 16,
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
  },
  backContainer: {
    backgroundColor: colors.white,
    padding: 10,
    margin: 24,
    borderRadius: 8,
    marginRight: 16,
    position: 'absolute',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    lineHeight: 30,
  },
  alertButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  alertButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
