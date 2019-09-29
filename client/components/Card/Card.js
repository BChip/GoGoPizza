import React from 'react'
import { View, Text, Image, ImageSourcePropType } from 'react-native'
import { shape, string, number } from 'prop-types'
import styles from './Card.styles'
import { interfaceDeclaration } from '@babel/types'

const Card = ({ card }) => (
  <View
    style={styles.card}
  >
    <Image
      style={styles.image}
      source={card.img}
      resizeMode="cover"
    />
    <View style={styles.photoDescriptionContainer}>
      <Text style={styles.text}>
        {`${card.name}`}
      </Text>
    </View>
  </View>
)

Card.propTypes = {
  card: shape({
    img: ImageSourcePropType,
    name: string,
    desc: string,
    id: number,
  }).isRequired,
}

export default Card
