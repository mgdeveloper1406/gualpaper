import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../../assets/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  contentContainerStyle: {
    flexGrow: 1
  },
  logoWrapper: {
    marginTop: 8,
    padding: 30,
    alignItems: 'center'
  },
  logo: {
    height: 50,
    width: 120
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginVertical: 4
  },
  menuItemText: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 15,
    textTransform: 'capitalize',
    ...fonts.semiboldFont
  }
})
