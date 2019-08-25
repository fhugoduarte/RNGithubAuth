import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import SignIn from './pages/SignIn';
import Home from './pages/Home';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    Home,
  }),
);
