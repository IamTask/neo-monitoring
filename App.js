import React, { Component } from 'react';
import { View, AppRegistry } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Actions } from 'react-native-router-flux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Constants, Notifications, Permissions } from 'expo';
import _ from 'lodash';
//import { Button, Spinner, CardSection } from './src/components/common';
//import AlbumList from './src/components/AlbumList';
//import MonitoringPanel from './src/components/MonitoringPanel';
//import LoginForm from './src/components/LoginForm';
import reducers from './src/reducers';
//import LibraryList from './src/components/LibraryList';
import Router from './src/Router';
//import PushNotificationHandler from './src/components/PushNotificationHandler';


class App extends Component {
  state = { loggedIn: null, store: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDMTrJrF2cdlsxzYD2uU43q20_U5_pcyX4",
      authDomain: "monitoring-neodata.firebaseapp.com",
      databaseURL: "https://monitoring-neodata.firebaseio.com",
      projectId: "monitoring-neodata",
      storageBucket: "monitoring-neodata.appspot.com",
      messagingSenderId: "798015804425"
    });

    firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          this.setState({ loggedIn: true });
          Actions.main();
        } else {
          this.setState({ loggedIn: false });
        }
    });
    // {} --> initialState
    //applyMiddleware--> store enhancer --> adds functionalities
    const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
    //const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancers = composeEnhancers(applyMiddleware(ReduxThunk));
    const store = createStore(
      reducers,
      {},
      enhancers
    );

    this.setState({
      store
    });
  }
  async componentDidMount() {
      // We need to ask for Notification permissions for ios devices
      const result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

      if (Constants.isDevice && result.status === 'granted') {
          console.log('Notification permissions granted.');
      }

      // If we want to do something with the notification when the app
      // is active, we need to listen to notification events and
      // handle them in a callback
      Notifications.addListener(this.handleNotification);
  }

  handleNotification(notification) {
      console.log('ok! got your notif');
  }
  /*
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Logout
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />;
    }
  }
  */
  render() {
    return (
      <Provider store={this.state.store}>
        <View style={{ flex: 1, backgroundColor: '#f9faff' }}>
        {/*
          <MonitoringPanel />

          <Header headerText={'Login'} />
          {this.renderContent()}

          <Header headerText={'TechStack'} />
          <LibraryList />
          <PushNotificationHandler />
        */}

          <Router />
        </View>
      </Provider>
    );
  }
}

export default App;

AppRegistry.registerComponent("neodata-monitoring", App);
