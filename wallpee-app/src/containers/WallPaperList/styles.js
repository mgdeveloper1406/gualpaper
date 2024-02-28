import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { windowWidth } from "../../utils/deviceInfo";
import { fonts } from "../../../assets/fonts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    loadingWrapper: {
        padding: 15
    },
    flatlist: {
        flexGrow: 1,
        marginTop: 14,
        marginHorizontal: 7
    },
    wrapper: {
        width: (windowWidth - 42) / 2,
        height: (windowWidth - 42) / 2,
        marginHorizontal: 7,
        backgroundColor: colors.black,
        borderRadius: 8,
        marginBottom: 14
    },
    wallpaper: {
        width: (windowWidth - 42) / 2,
        height: (windowWidth - 42) / 2,
        borderRadius: 8
    },
    notFoundText: {
        fontSize: 13,
        color: colors.white,
        textAlign: 'center',
        padding: 20,
        ...fonts.semiboldFont
    }
})