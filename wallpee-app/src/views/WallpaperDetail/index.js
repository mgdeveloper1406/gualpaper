import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, PermissionsAndroid, Platform } from 'react-native';
import RNFS, { stat } from 'react-native-fs';
import Share from 'react-native-share';
import WallpaperManager, { TYPE } from 'react-native-wallpaper-manage';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import Spinner from '../../containers/Spinner';
import TopNavBar from '../../containers/TopNavBar';
import LoadingIndicator from '../../containers/LoadingIndicator';
import Toast from '../../containers/Toast';
import styles from './styles';
import { colors } from '../../constants/colors';
import { getWallpaperDetails, onWallpaperDownload, wallpaperLikeDislike } from '../../actions/wallpaper';
import { addWallpaperToFavourites } from '../../actions/user';
import { isAndroid } from '../../utils/deviceInfo'; 

const WallpaperDetail = ({ route }) => {
    const [wallpaper, setWallpaper]= useState({});
    const [loading, setLoading] = useState(true);
    const [isLoader, setLoader] = useState(false);
    const msgToast = useRef(null);
    const errToast = useRef(null);
    const dispatch = useDispatch();
    const user =  useSelector((state) => state.user.user)

    useEffect(() => {
        getWallpaper()
    }, [])

    const getWallpaper = async () => {
        if(route && route.params && route.params.wallpaper && route.params.wallpaper._id) {
            const data = await dispatch(getWallpaperDetails({ wallpaperId: route.params.wallpaper._id }))
            if(data && data._id) setWallpaper(data)
            setLoading(false)
        }
    }

    const setAsWallpaper = async () => {
        if(wallpaper?.image) {
            setLoader(true)
            setTimeout(async () => {
                try {
                    const result = await WallpaperManager.setWallpaper(wallpaper?.image, TYPE.FLAG_SYSTEM)
                    if(result && result === wallpaper?.image) msgToast?.current?.show('Wallpaper set successfully');
                    setLoader(false)
                } catch(error) {
                    setLoader(false)
                    errToast?.current?.show('Unable to set wallpaper');
                }
            }, 300)
        }
    }

    const getFileExtension = (filename) => {
        if (filename) {
            return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        }
        return "";
    }

    const hasAndroidPermission = async () => {
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (hasPermission) return true;
        
        const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        return status === 'granted';
    }

    const downloadWallpaper = async () => {
        if (wallpaper?._id && wallpaper?.image) {
            if (Platform.OS === "android" && Platform.Version < 33 && !(await hasAndroidPermission())) {
                errToast?.current?.show('Please allow access to photo library from settings');
                return
            }
            
            setLoader(true)
            const filePath = RNFS.DocumentDirectoryPath + '/' + parseInt(new Date().getTime() / 1000) + '.' + getFileExtension(wallpaper.image)
            RNFS.downloadFile({
                fromUrl: wallpaper.image,
                toFile: filePath
            }).promise.then(({ r }) => {
                CameraRoll.save(filePath, 'photo')
                .then(async r => {
                    await dispatch(onWallpaperDownload({ wallpaperId: wallpaper._id }))
                    const downloads = [...wallpaper?.downloads]
                    const index = downloads?.findIndex(downloadId => downloadId === user?._id)
                    if(index == -1) { 
                        downloads.push(user?._id)
                        setWallpaper({ ...wallpaper, downloads })
                    }
                    setLoader(false)
                    msgToast?.current?.show('Wallpaper downloaded successfully');
                })
                .catch((err) => {
                    errToast?.current?.show('Unable to download wallpaper');
                    setLoader(false)
                });
            });
        }
    }

    const likeDislikeWallpaper = async () => {
        if(wallpaper?._id) {
            const result = await dispatch(wallpaperLikeDislike({ wallpaperId: wallpaper._id }))
            if(result?.data?.wallpaperLikeDislike) {
                const likes = [...wallpaper?.likes]
                const index = likes?.findIndex(likeId => likeId === user?._id)
                index > -1 ? likes.splice(index, 1) : likes.push(user?._id)
                setWallpaper({ ...wallpaper, likes })
            }
        }
    }

    const shareWallpaper = async () => {
        if(wallpaper?.image) {
            const shareOptions = {
                title: wallpaper?.name || 'wallpaper',
                failOnCancel: false,
                urls: [wallpaper?.image],
            };
        
            try {
                const shareResponse = await Share.open(shareOptions);
                if(shareResponse && shareResponse.success) msgToast?.current?.show('Wallpaper shared successfully');
            } catch (error) {
                errToast?.current?.show('Unable to share wallpaper');
            }
        }
    }

    const onFavouritePress = async () => {
        if(wallpaper?._id) await dispatch(addWallpaperToFavourites({ wallpaperId: wallpaper?._id }))
    }

    const isWallpaperLiked = wallpaper?.likes?.find(likeId => likeId === user?._id) 
    const isFavourite = user?.favourites?.find(favouriteId => favouriteId === wallpaper?._id)

    return (
        <View style={styles.container}>
            {loading ?
                <>
                    <TopNavBar from={'wallpaper'} title={wallpaper?.name || ''} />
                    <Spinner />
                </>
            :
                <>
                    <TopNavBar 
                        from={'wallpaperDetail'} 
                        title={wallpaper?.name || ''} 
                        onSharePress={() => shareWallpaper()}
                        onFavouritePress={() => onFavouritePress()}
                        isFavourite={isFavourite}
                    />
                    <ScrollView 
                        style={styles.wrapper} 
                        contentContainerStyle={styles.scrollContainerStyle}
                    >
                        <View>
                            <View style={styles.imageWrapper}>
                                <FastImage
                                    style={styles.wallpaperImg}
                                    source={{ uri: wallpaper.image }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </View>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={styles.infoWrapper}
                                    activeOpacity={0.4}
                                    onPress={() => likeDislikeWallpaper()}
                                >
                                    <MaterialCommunityIcon name={isWallpaperLiked ? 'heart' : 'heart-outline'} size={20} color={isWallpaperLiked ? colors.red : colors.white} />
                                    <Text style={styles.likeText}>{wallpaper?.likes?.length || 0}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.infoWrapper, { marginLeft: 10 }]}
                                    activeOpacity={0.4}
                                    onPress={() => downloadWallpaper()}
                                >
                                    <MaterialCommunityIcon name={'download-circle-outline'} size={22} color={colors.white} />
                                    <Text style={styles.likeText}>{wallpaper?.downloads?.length || 0}</Text>
                                </TouchableOpacity>
                                {isAndroid &&
                                    <TouchableOpacity
                                        style={[styles.infoWrapper, { marginLeft: 10 }]}
                                        activeOpacity={0.4}
                                        onPress={() => setAsWallpaper()}
                                    >
                                        <MaterialIcon name={'wallpaper'} size={16} color={colors.white} />
                                    </TouchableOpacity>
                                }       
                            </View>
                            {wallpaper?.createdAt &&
                                <View style={styles.outerWrapper}>
                                    <MaterialIcon name={'calendar-today'} size={20} color={colors.white} />
                                    <Text style={styles.infoText}>Published on {moment(wallpaper?.createdAt).format('ll')}</Text>
                                </View>
                            }
                        </View>
                    </ScrollView>
                    <LoadingIndicator visible={isLoader} />
                    <Toast ref={msgToast} position={'center'} positionValue={170} />
                    <Toast ref={errToast} position={'center'} positionValue={170} style={styles.errorToast} textStyle={styles.errorToastText} />
                </>
            }
        </View>
    )
}

export default WallpaperDetail