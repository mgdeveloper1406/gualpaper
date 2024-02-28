import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import store from './src/store';
import apolloClient from './src/graphql/client';
import AppNavigator from './src/navigator';
import StatusBar from './src/containers/StatusBar';
import { colors } from './src/constants/colors';
import { getData } from './src/utils/storage';
import { getUserDetails, addUser } from './src/actions/user';
import Spinner from './src/containers/Spinner';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUserToken()
    SplashScreen.hide();
  }, [])

  const setUserToken = async () => {
    const token = JSON.parse(await getData('token'))
    if(token) {
			await store.dispatch(getUserDetails(token))
	  } else {
			await store.dispatch(addUser())
		}
    setLoading(false)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            <StatusBar />
            <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
              {loading ?
                <Spinner />
              :
                <NavigationContainer>
                  <AppNavigator />
                </NavigationContainer>
              }
            </SafeAreaView>
          </ApolloProvider>
	      </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  }
})