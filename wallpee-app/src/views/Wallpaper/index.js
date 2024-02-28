import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import TopNavBar from '../../containers/TopNavBar';
import WallPaperList from '../../containers/WallPaperList';
import Spinner from '../../containers/Spinner';
import { getWallpapers } from '../../actions/wallpaper';
import styles from './styles';

const Wallpaper = (props) => {
    const from = props.route && props.route.params && props.route.params.from ? props.route.params.from : 'search';
    const searchText = props.route && props.route.params && props.route.params.searchText ? props.route.params.searchText : '';
    const category = props.route && props.route.params && props.route.params.category ? props.route.params.category : {};
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ skip: 0, limit: 15 });
    const [refreshing, setRefreshing] = useState(false);
    const wallPapers = useSelector((state) => state.wallpaper[from].wallpapers);
    const totalWallPaper = useSelector((state) => state.wallpaper[from].total);
    const loadMore =  useSelector((state) => state.wallpaper[from].loading);
    const dispatch = useDispatch();

    useEffect(() => {
        getData()
    }, [pagination])

    const getData = async () => {
        var args = { ...pagination }
        if(category && category._id) args['categoryId'] = category?._id
        else if(searchText) args['keyword'] = searchText
        await dispatch(getWallpapers(args, from))
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
            <TopNavBar from={from} title={from === 'category' ? (category?.name || '') : searchText} />
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

export default Wallpaper