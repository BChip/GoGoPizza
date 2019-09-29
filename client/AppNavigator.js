import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Train from './Train'
import Home from './Home'
import Friends from './Friends'
import TrainCrust from './TrainCrust'
import Build from './Build'

const AppNavigator = createStackNavigator({
  Train: { screen: Train, 
    navigationOptions:  {
      title: 'Pick Your Favorite Toppings',
      headerLeft: null,
      gesturesEnabled: false,
      headerStyle: {backgroundColor: '#FF671B'},
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    } 
  },
  TrainCrust: { screen: TrainCrust, 
    navigationOptions:  {
      title: 'Pick Your Favorite Crust',
      headerLeft: null,
      gesturesEnabled: false,
      headerStyle: {backgroundColor: '#FF671B'},
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    } 
  },
  Build: { screen: Build, 
    navigationOptions:  {
      title: 'Your Pizza',
      headerLeft: null,
      gesturesEnabled: false,
      headerStyle: {backgroundColor: '#FF671B'},
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    } 
  },
  Home: {screen: Home,
    navigationOptions:  {
      title: 'Order',
      headerLeft: null,
      gesturesEnabled: false,
      headerStyle: {backgroundColor: '#FF671B'},
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    } 
  },
  Friends: {screen: Friends,
    navigationOptions:  {
      title: 'Add Friends to Order',
      headerStyle: {backgroundColor: '#FF671B'},
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    } 
  },
})

export default createAppContainer(AppNavigator)
