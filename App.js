import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

import Dedicada from './Dedicada';
import Pesquisa from './Pesquisa';
import Inicio from './Inicio';

const RootStack = createStackNavigator(
  {
    Pesquisa: Pesquisa ,
    Dedicada: Dedicada ,
    Inicio: Inicio
  },
  {
    initialRouteName: 'Inicio',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
