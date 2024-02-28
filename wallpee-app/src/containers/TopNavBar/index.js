import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import { images } from '../../../assets/images';
import styles from './styles';
import { colors } from '../../constants/colors';

const TopNavBar = React.memo(({ from, title, onSharePress, onFavouritePress, isFavourite }) => {
    const navigation = useNavigation()

    if(from) {
        return (
            <View style={styles.mainWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.titleText(from)} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text>
                </View>
                <TouchableOpacity
                    style={styles.backIconWrapper}
                    activeOpacity={0.4}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcon name={'keyboard-arrow-left'} size={24} color={colors.white} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                
                {from === 'wallpaperDetail' &&
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.actionIconWrapper}
                            activeOpacity={0.4}
                            onPress={() => onSharePress && onSharePress()}
                        >
                            <MaterialIcon name={'ios-share'} size={20} color={colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionIconWrapper}
                            activeOpacity={0.4}
                            onPress={() => onFavouritePress && onFavouritePress()}
                        >
                            <MaterialIcon name={isFavourite ? 'star' : 'star-border'} size={22} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )  
    }

    return (
        <View style={styles.headerWrapper}>
            <View style={styles.logoWrapper}>
                <FastImage source={images.logo} style={styles.logo} resizeMode={'contain'} />
            </View>
            <TouchableOpacity
                style={styles.iconWrapper}
                activeOpacity={0.4}
                onPress={() => navigation.openDrawer()}
            >
                <MaterialIcon name={'menu'} size={22} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.iconWrapper}
                activeOpacity={0.4}
                onPress={() => navigation.navigate('Search')}
            >
                <MaterialIcon name={'search'} size={22} color={colors.white} />
            </TouchableOpacity>
        </View>
    )
})

export default TopNavBar;
