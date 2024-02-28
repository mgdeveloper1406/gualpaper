import { StyleSheet, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBar, TabBarItem } from 'react-native-tab-view';

import Recent from './views/Recent';
import Trending from './views/Trending';
import Featured from './views/Featured';
import Category from './views/Category';
import Wallpaper from './views/Wallpaper';
import WallpaperDetail from './views/WallpaperDetail';
import Favourite from './views/Favourite';
import Search from './views/Search';
import Sidebar from './views/Sidebar';
import TopNavBar from './containers/TopNavBar';

import { colors } from './constants/colors';

const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TopTabStack = () => (
    <TopTab.Navigator
        style={{ backgroundColor: colors.primary }}
        tabBar={props => (
            <TabBar 
                bounces={false}
                scrollEnabled={true}
                gap={10}
                style={styles.tabStyle}
                contentContainerStyle={{ width: 'auto' }}
                labelStyle={styles.labelStyle}
                indicatorStyle={styles.indicatorStyle}
                renderTabBarItem={itemProp => (
                    <TabBarItem 
                        {...itemProp} 
                        style={[styles.tabBarItemStyle, { backgroundColor: itemProp?.route?.name === props?.state?.routeNames[props?.state?.index] ? colors.secondary : colors.primary }]}
                        renderLabel={({ route }) => <Text style={styles.labelStyle}>{route?.name}</Text>}
                    />
                )}
                animationEnabled={false}
                {...props} 
            />
        )}
    >
        <TopTab.Screen name="Recent" component={Recent} />
        <TopTab.Screen name="Trending" component={Trending} />
        <TopTab.Screen name="Featured" component={Featured} />
        <TopTab.Screen name="Category" component={Category} />
    </TopTab.Navigator>
);

const MainStack = () => (
    <Stack.Navigator 
        screenOptions = {({ route }) => {
            return {
                header: () => <TopNavBar />,
                headerShown: route?.name && route?.name === 'TopTab' ? true : false
            }
        }}
    >
        <Stack.Screen name={'TopTab'} component={TopTabStack} />
        <Stack.Screen name={'Wallpaper'} component={Wallpaper} />
        <Stack.Screen name={'WallpaperDetail'} component={WallpaperDetail} />
        <Stack.Screen name={'Favourite'} component={Favourite} />
        <Stack.Screen name={'Search'} component={Search} />
    </Stack.Navigator>
)

export default AppNavigator = () => (
    <Drawer.Navigator drawerContent={props => <Sidebar {...props} />}>
        <Drawer.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
    </Drawer.Navigator>
)

const styles = StyleSheet.create({
    tabStyle: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        minHeight: 40,
        maxHeight: 40,
        margin: 0,
        backgroundColor: colors.black,
        marginHorizontal: 15,
        borderRadius: 45,
        maxWidth: '100%'
        
    },
    labelStyle: {
        fontSize: 13,
        lineHeight: 14,
        fontFamily: 'Montserrat-Bold',
        color: colors.white,
        marginVertical: 10,
        marginHorizontal: 15
    },
    indicatorStyle: {
        display: 'none'
    },
    tabBarItemStyle: {
        borderRadius: 15,
        width: 'auto',
        minHeight: 30,
        height: 30,
        margin: 0,
        padding: 0
    },
    labelStyle: {
        fontSize: 12,
        lineHeight: 14,
        fontFamily: 'Montserrat-Bold',
        color: colors.white,
        marginVertical: 6,
        marginHorizontal: 15
    }
})