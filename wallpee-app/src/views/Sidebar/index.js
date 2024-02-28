import React from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { images } from '../../../assets/images';
import { colors } from '../../constants/colors';
import styles from './styles';

const Sidebar = (props) => {
    const drawerItems = [
        { name: 'home', icon: 'house', screen: 'Recent' },
        { name: 'favourites', icon: 'favorite', screen: 'Favourite' },
        { name: 'share', icon: 'share' }
    ]

    const handleItemPress = (option, screenName) => {
        if(option === 'share') handleShareApp()
        else if(option === 'home' || option === 'favourites') {
            props.navigation.closeDrawer();
            props.navigation.navigate(screenName)
        }
    }
    
    const handleShareApp = async () => {
        const shareOptions = {
            title: 'Wallpapers app',
            message: 'Hey! Checkout this awesome wallpapers app',
            subject: 'Wallpapers app',
            email: 'email@example.com',
            failOnCancel: false
        };
      
        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log('Result =>', ShareResponse);
        } catch (error) {
            console.log('Error =>', error);
        }
    }

    const renderDrawerItem = (item, index) => (
        <TouchableOpacity style={styles.itemWrapper} activeOpacity={0.08} onPress={() => handleItemPress(item?.name, item?.screen)} key={index}>
          <MaterialIcon name={item.icon} size={22} color={colors.white} />
          <Text style={styles.menuItemText}>{item.name}</Text>
        </TouchableOpacity>
      )
    
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
            bounces={false}
        >
            <View style={styles.logoWrapper}>
                <FastImage source={images.logo_white} resizeMode={'contain'} style={styles.logo} />
            </View>
            {drawerItems.map((drawerItem, index) => renderDrawerItem(drawerItem, index))}
        </ScrollView>
    )
}

export default Sidebar