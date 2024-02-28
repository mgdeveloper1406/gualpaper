import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { windowWidth } from '../../utils/deviceInfo';
import { fonts } from "../../../assets/fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  headerView: {
    marginTop: 20,
    flexDirection: 'row',
    zIndex: 1,
    marginHorizontal: 20,
    height: 40,
    backgroundColor: colors.black,
    borderRadius: 32
  },
  iconWrapper: {
    height: 40,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  serchInputStyle: {
  	alignSelf: 'center',
    width: windowWidth - 130,
    height: 40,
    backgroundColor: 'transparent',
    fontSize: 14,
    lineHeight: 16,
    color: colors.white,
    ...fonts.regularFont
  },
  historyWrapper: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20
  },
  recentSearchText: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.white,
    marginBottom: 10,
    ...fonts.semiboldFont
  },
  searchHistoryView: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  historyTextWrapper: {
    marginLeft: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.paleGray,
    height: '100%',
    width: windowWidth - 60,
    justifyContent: 'center'
  },
  historyText: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.white,
    ...fonts.regularFont
  }
})
