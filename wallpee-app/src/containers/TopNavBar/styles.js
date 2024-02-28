import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../../assets/fonts'; 
import { windowWidth } from '../../utils/deviceInfo';

export default StyleSheet.create({
	headerWrapper: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        backgroundColor: colors.primary
	},
    iconWrapper: {
        height: 70,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainWrapper: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: colors.black
    },
    innerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        height: 70,
        backgroundColor: colors.black, 
        marginHorizontal: 15
    },
    backIconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        padding: 2,
        paddingRight: 12,
        backgroundColor: colors.primary
    },
    backText: {
        fontSize: 14,
        lineHeight: 14,
        color: colors.white,
        ...fonts.boldFont
    },
    titleWrapper: {
        position: 'absolute',
        top: 0,
        left: 80,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: from => ({
        fontSize: 15,
        color: colors.white,
        width: from === 'wallpaperDetail' ? windowWidth - 160 : windowWidth - 145,
        textAlign: 'center',
        marginRight: from === 'wallpaperDetail' ? 70 : 50,
        ...fonts.boldFont
    }),
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionIconWrapper: {
        height: 25,
        width: 25,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 5
    },
    logoWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: 45,
        width: 100
    }
})
