import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import TopNavBar from '../../containers/TopNavBar';
import Spinner from '../../containers/Spinner';
import WallPaperList from '../../containers/WallPaperList';
import { getWallpapers } from '../../actions/wallpaper';
import styles from './styles';

const Favourite = () => {
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ skip: 0, limit: 15 })
    const [refreshing, setRefreshing] = useState(false);
    const wallPapers = useSelector((state) => state.wallpaper.favourites.wallpapers)
    const totalWallPaper = useSelector((state) => state.wallpaper.favourites.total)
    const loadMore =  useSelector((state) => state.wallpaper.favourites.loading)
    const dispatch = useDispatch()

    useFocusEffect(
        React.useCallback(() => {
            setPagination({ skip: 0, limit: 1 })
        }, [])
    );

    useEffect(() => {
        getData()
    }, [pagination])

    const getData = async () => {
        await dispatch(getWallpapers({ ...pagination, isFavourites: true }, 'favourites'))
        setLoading(false)
        setRefreshing(false)
    }

    const handleLoadMore = async () => {
        if (wallPapers.length >= totalWallPaper || loadMore || loading || refreshing) {
          return;
        }
        setPagination({ ...pagination, skip: wallPapers.length })
    }
    
    const handleRefresh = () => {
        setRefreshing(true)
        setPagination({ ...pagination, skip: 0 })
    }
    
    return (
        <View style={styles.container}>
            <TopNavBar from={'favourites'} title={'Favourites'} />
            {loading ?
                <Spinner />
            :
                <WallPaperList
                    wallPapers={wallPapers}
                    pullToRefresh={true}
                    handleLoadMore={() => handleLoadMore()}
                    refreshing={refreshing}
                    loading={loadMore && !loading && !refreshing}
                    handleRefresh={() => handleRefresh()}
                />
            }
        </View>
    )
}
  
export default Favourite;