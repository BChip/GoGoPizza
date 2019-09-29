import React, { Component } from 'react'
import { View, Text, Alert, TextInput } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { pizzas } from './constants'
import { Card, IconButton, OverlayLabel } from './components'
import styles from './App.styles'

class Train extends Component {
  constructor (props) {
    super(props)
    this.state = {
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      prefs: [],
      user: '',
    }
  }


  handleOnSwipedLeft = () => this.swiper.swipeLeft()

  handleOnSwipedTop = () => this.swiper.swipeTop()

  handleOnSwipedRight = () => this.swiper.swipeRight()

  onSwiped = (type) => {
    const {
      prefs,
    } = this.state
    prefs.push(type)
    this.setState(prefs)
    
  }

  onSwipedAllCards = () => {
    const {
      prefs,
      user,
    } = this.state
    this.props.screenProps.setUser(user)
    
    const toppings = pizzas.toppings.map(i => i.name)
    fetch('http://0.0.0.0:5000/traintoppings', {
         method: 'POST', 
         headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }, 
        body: JSON.stringify({data: toppings, scores: prefs, userid: user})
      })
      .catch((error) => {
         
      });
      
    this.props.navigation.navigate('TrainCrust')
  }

  render() {
    return (
      <View
        style={styles.container}>
          <TextInput
        placeholder="User"
        label='User'
        value={this.state.user}
        onChangeText={text => this.setState({ user: text })}
        style={{borderWidth: 1, width: '70%', left: '15%', marginTop: 15, zIndex: 5, backgroundColor: '#fff', height: 40, borderRadius: 5}}
      />
        
        <View style={styles.swiperContainer}>          
          <Swiper
            ref={(swiper) => {
              this.swiper = swiper
            }}
            onSwipedLeft={() => this.onSwiped(0)}
            onSwipedRight={() => this.onSwiped(1)}
            onSwipedTop={() => this.onSwiped(2)}
            animateCardOpacity
            containerStyle={styles.container}
            cards={pizzas.toppings}
            renderCard={card => <Card card={card} />}
            cardIndex={0}
            backgroundColor="white"
            stackSize={2}
            showSecondCard
            onSwipedAll={this.onSwipedAllCards}
            animateOverlayLabelsOpacity
            overlayLabels={{
              left: {
                title: 'NOPE',
                element: <OverlayLabel label="NOPE" color="#E5566D" />,
                style: {
                  wrapper: styles.overlayWrapper,
                },
              },
              right: {
                title: 'LIKE',
                element: <OverlayLabel label="LIKE" color="#4CCC93" />,
                style: {
                  wrapper: {
                    ...styles.overlayWrapper,
                    alignItems: 'flex-start',
                    marginLeft: 30,
                  },
                },
              },
            }}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <IconButton
            name="close"
            onPress={this.handleOnSwipedLeft}
            color="white"
            backgroundColor="#FF671B"
          />
          <IconButton
            name="star"
            onPress={this.handleOnSwipedTop}
            color="white"
            backgroundColor="#FF671B"
          />
          <IconButton
            name="heart"
            onPress={this.handleOnSwipedRight}
            color="white"
            backgroundColor="#FF671B"
          />
        </View>

      </View>
    )
          }
}

export default Train
