import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../containers/Spinner';
import { getCategories } from '../../actions/category';
import styles from './styles';

const Category = () => {
    const navigation = useNavigation()
    const categories = useSelector((state) => state.category.categories)
    const loading = useSelector((state) => state.category.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    return (
        <View style={styles.container}>
            {loading ?
                <Spinner />
            :
                categories.length > 0 ?
                    <ScrollView style={styles.scrollViewWrapper}>
                        <View style={styles.wrapper}>
                            {categories.map((category, index) => (
                                <TouchableOpacity style={styles.categoryWrapper} key={index} onPress={() => navigation.navigate('Wallpaper', { category, from: 'category' })}>
                                    <Text style={styles.categoryText}>{category.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                :
                    <Text style={styles.notFoundText}>No categories found</Text>       
            }
        </View>
    )
}

export default Category