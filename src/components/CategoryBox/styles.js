import {StyleSheet} from 'react-native';
import {colors} from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 30,
    paddingTop: 20,
  },
  title: {
    color: colors.grey,
  },
  image: {
    width: 30,
    height: 30,
  },
  imageContainer: {
    backgroundColor: colors.lightGrey,
    padding: 10,
    borderRadius: 15,
    marginBottom: 8,
  },
});
