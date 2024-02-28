import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import WallPaperList from '../../containers/WallPaperList';
import Spinner from '../../containers/Spinner';
import { getWallpapers } from '../../actions/wallpaper';
import styles from './styles';

const Trending = () => {
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ skip: 0, limit: 15 })
    const [refreshing, setRefreshing] = useState(false);
    const wallPapers = useSelector((state) => state.wallpaper.trending.wallpapers)
    const totalWallPaper = useSelector((state) => state.wallpaper.trending.total)
    const loadMore =  useSelector((state) => state.wallpaper.trending.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        getData()
    }, [pagination])

    const getData = async () => {
        await dispatch(getWallpapers({ ...pagination, type: 'trending' }, 'trending'))
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
  
export default Trending;