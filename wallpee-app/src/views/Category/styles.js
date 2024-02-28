import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { fonts } from "../../../assets/fonts";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    scrollViewWrapper: {
        marginTop: 15
    },
    wrapper: {
        flexDirection: 'row', 
        flexWrap: 'wrap'
    },
    categoryWrapper: {
        paddingVertical: 8, 
        paddingHorizontal: 14, 
        backgroundColor: colors.black, 
        borderRadius: 32, 
        marginHorizontal: 4,
        marginBottom: 8
    },
    categoryText: {
        fontSize: 12,
        lineHeight: 14,
        color: colors.white,
        ...fonts.semiboldFont
    },
    notFoundText: {
        fontSize: 13,
        color: colors.white,
        textAlign: 'center',
        padding: 20,
        ...fonts.semiboldFont
    },
})