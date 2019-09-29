import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, ActivityIndicator } from 'react-native';


export default class Build extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
          toppingsRec: null
        }
      }


      onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    async componentDidMount() {
        const {currentFriends, currentUser} = this.props.screenProps
        const users = "&users="+currentFriends.join("&users=")
        const resp = await fetch(`http://0.0.0.0:5000/recommend?users=${currentUser}${users}&num=${currentFriends.length+1}`, {
         method: 'GET', 
        })
        const json = await resp.json()
        this.setState({
            toppingsRec: Object.values(json.item_id).filter( this.onlyUnique )
        })
      
    }

  render() {
      return this.state.toppingsRec ? (
      <View style={styles.container}>
  
            

                <Image style={{zIndex: 1, position: 'absolute',}} source = {require('./assets/round_base.png')}  />
                {this.state.toppingsRec.map(topping => {
                        Alert.alert(topping)
                 return   (
                    <Image style = {{zIndex: 5, position: 'absolute',}} source = {`./assets/${topping}.png`} />
                )})}


        {this.state.toppingsRec.map(topping => (
            <Text style={{color: 'white', marginBottom: 50}}>{topping}</Text>
        ))}
        
      </View>
    )

    :

    (
        <View style={styles.container}>
            <ActivityIndicator color={"#FF671B"} />
          </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },

});