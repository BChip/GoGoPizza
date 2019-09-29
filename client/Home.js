import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native'
import { Card, IconButton, OverlayLabel } from './components'
import styles from './App.styles'

export default class Home extends React.Component {
  render() {
    return (
      <View style={s.container}>
          <Image source={{uri: "https://pbs.twimg.com/profile_images/925726655523385344/fDCkJQ72_400x400.jpg"}} style={{width: 250, height: 250}}/>
          <Text style={{fontSize: 40, fontWeight: 'bold', color: 'white'}}>Ez Way To Order Pizza</Text>
          <IconButton
            name="shoppingcart"
            color="white"
            backgroundColor="#FF671B"
            style={{padding: 10}}
            onPress={() => this.props.navigation.navigate('Build')}
          />
          <IconButton
            name="addusergroup"
            color="white"
            backgroundColor="#FF671B"
            style={{padding: 10}}
            onPress={() => this.props.navigation.navigate('Friends')}
          />
          
          <Text style={{color: "#fff"}}>You added {this.props.screenProps.currentFriends.length} to this order</Text>
        
      </View>
    );
  }
}

const s = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });