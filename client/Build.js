import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, ActivityIndicator } from 'react-native';
import { Card, IconButton, OverlayLabel } from './components'
import Bacon from './assets/Bacon.png'
import Pepperoni from './assets/Pepperoni.png'
import Beef from './assets/Beef.png'
import GreenPeppers from './assets/GreenPeppers1.png'
import Mushrooms from './assets/Mushrooms.png'
import Onions from './assets/Onions.png'
import BlackOlives from './assets/BlackOlives1.png'
import BananaPeppers from './assets/BananaPeppers1.png'
import Pineapple from './assets/Pineapple.png'
import Sausage from './assets/Sausage.png'
import Ham from './assets/Ham.png'
import ExtraCheese from './assets/Extra Cheese.png'

const Toppings = {
    "Bacon": Bacon,
    "Green Peppers": GreenPeppers,
    "Beef": Beef,
    "Pepperoni": Pepperoni,
    "Mushrooms": Mushrooms,
    "Onions": Onions,
    "Black Olives": BlackOlives,
    "Banana Peppers": BananaPeppers,
    "Pineapple": Pineapple,
    "Sausage": Sausage,
    "Ham": Ham,
    "Extra Cheese": ExtraCheese,

}

console.disableYellowBox = true;

var x = 5

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
  
            

                <Image style={{zIndex: 1, position: 'absolute',top: 10}} source = {require('./assets/round_base.png')}  />
                {this.state.toppingsRec.map(topping => {
                 return   (
                    <Image style = {{zIndex: x++, position: 'absolute', top: 10}} source = {Toppings[topping]} />
                )})}


        {this.state.toppingsRec.map(topping => (
            <Text style={{color: 'white', top: 250}}>{topping}</Text>
        ))}
        <View style={{top: 300}}>
        <IconButton
            name="shoppingcart"
            color="white"
            backgroundColor="#FF671B"
            onPress={() => {
                Alert.alert("Order Complete!")
                this.props.navigation.navigate("Home")
            }}
          />
          </View>
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
    paddingTop: 20
  },

});