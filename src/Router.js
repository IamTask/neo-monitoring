import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import CoordinatorsList from './components/CoordinatorsList';
import Beginning from './components/Beginning';
import TaggedResourcesList from './components/TaggedResourcesList';
import EditResources from './components/EditResources';
import NotificationList from './components/NotificationList';
import Dashboard from './components/Dashboard';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root' hideNavBar>
          <Scene key='auth'>
            <Scene key='login' component={LoginForm} title="Please Login" initial />
          </Scene>
          <Scene key='main' >
            <Scene
              key="Beginning"
              component={Beginning}
              title="Neodata Monitoring"
              initial

            />

            <Scene
              key="Dashboard"
              component={Dashboard}
              title="Overview"
            />

            <Scene
              key="coordinatorsList"
              component={CoordinatorsList}
              title="Coordinators"
            />

            <Scene
              key="EditResources"
              component={EditResources}
              title="Tag an existing coordinator"

            />

            <Scene
              rightTitle='Edit'
              key="taggedResourcesList"
              onRight={() => { Actions.EditResources(); }}
              component={TaggedResourcesList}
              title="Tagged Resources"
            />

            <Scene
              key="listNotifications"
              component={NotificationList}
              title="Subscribe to Notifications"
            />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
