import React from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, RefreshControl, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { colors } from '../../constants/colors';

const WallPaperList = (props) => {
    const navigation = useNavigation();

    const renderWallPaper = ({ item, index }) => (
        <TouchableOpacity 
            style={styles.wrapper} 
            key={index} 
            onPress={() => navigation.navigate('WallpaperDetail', { wallpaper: item })}
        >
            <FastImage
                style={styles.wallpaper}
                source={{ uri: item.image }}
                resizeMode={FastImage.resizeMode.cover}
            />
        </TouchableOpacity>
    )

    const renderFooter = () => {
        if (!props.loading) return null;

        return (
            <View style={styles.loadingWrapper}>
                <ActivityIndicator size={'large'} color={colors.white} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {props?.wallPapers && props?.wallPapers?.length > 0 ?
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={props?.wallPapers || []}
                    renderItem={item => renderWallPaper(item)}
                    ListFooterComponent={() => renderFooter()}
                    onEndReached={() => props.handleLoadMore && props.handleLoadMore()}
                    onEndReachedThreshold={0.2}
                    refreshControl={props.pullToRefresh ? <RefreshControl refreshing={props.refreshing} colors={[colors.black]} tintColor={colors.white} onRefresh={() => props.handleRefresh && props.handleRefresh()} /> : null}
                    numColumns={2}
                    style={styles.flatlist}
                /> 
            :
                <Text style={styles.notFoundText}>No wallpapers found</Text>
            }
        </View>
    )
}

export default WallPaperList