import React, { Component } from 'react'
import { View, Text, Alert, TextInput } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { pizzas } from './constants'
import { Card, IconButton, OverlayLabel } from './components'
import styles from './App.styles'

class TrainCrust extends Component {
  constructor (props) {
    super(props)
    this.state = {
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      prefs: []
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
    } = this.state
    const {currentUser} = this.props.screenProps
    const toppings = pizzas.crust.map(i => i.name)
    Alert.alert(currentUser)
    fetch('http://0.0.0.0:5000/traincrust', {
         method: 'POST', 
         headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }, 
        body: JSON.stringify({data: toppings, scores: prefs, userid: currentUser})
      })
      .catch((error) => {
         
      });
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <View
        style={{borderWidth: 1, width: '70%', left: '15%', marginTop: 15, zIndex: 5, height: 40, borderRadius: 5}}
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
            cards={pizzas.crust}
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

export default TrainCrust
