import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { windowWidth, windowHeight } from "../../utils/deviceInfo";
import { fonts } from "../../../assets/fonts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    wrapper: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 15,
        paddingBottom: 15
    },
    scrollContainerStyle: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    imageWrapper: {
        borderRadius: 10,
        width: windowWidth - 30,
        height: windowHeight - 300,
        backgroundColor: colors.black
    },
    wallpaperImg: {
        width: windowWidth - 30,
        height: windowHeight - 300,
        borderRadius: 10
    },
    row: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 10,
        justifyContent: 'center', 
        borderRadius: 32,
        backgroundColor: colors.black
    },
    infoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        paddingVertical: 2,
        paddingLeft: 10,
        paddingRight: 14,
        backgroundColor: colors.primary
    },
    likeText: {
        fontSize: 12,
        lineHeight: 14,
        color: colors.white,
        marginLeft: 5,
        ...fonts.boldFont
    },
    outerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 15
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    infoText: {
        fontSize: 12,
        lineHeight: 14,
        color: colors.white,
        marginLeft: 5,
        ...fonts.semiboldFont
    },
    errorToast: {
        backgroundColor: colors.red
    },
    errorToastText: {
        color: colors.white
    }
})