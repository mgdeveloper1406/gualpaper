import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

const styles = StyleSheet.create({
	indicator: {
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
	}
});

const Spinner = ({style}) => <ActivityIndicator style={[styles.indicator, style]} color={colors.secondary} size={'large'} />;

export default Spinner;
