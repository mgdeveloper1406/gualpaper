import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';

const LoadingIndicator = ({ visible }) => (
    <Modal
        animationType={'fade'}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={visible}
    >
        <View style={styles.container}>
            <View style={styles.backgroundChild}>
                <BarIndicator
                    animating={true}
                    count={5}
                    size={30}
                    color={'#fff'}
                    animationDuration={800}
                />
            </View>
        </View>
    </Modal>
)

const styles = StyleSheet.create({
    backgroundChild: {
        paddingHorizontal: 15,
        height: 130,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 65
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(34, 34, 34, 0.6)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default LoadingIndicator;
