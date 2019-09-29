import React from 'react'
import AppNavigator from './AppNavigator'
import { View, Text, Alert, TextInput } from 'react-native'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: '',
          possibleFriends: null,
          currentFriends: [],
        }
      }

      async componentDidMount(){
        const resp = await fetch("http://0.0.0.0:5000/users")
        const t = await resp.json()
        var {possibleFriends} = this.state
        possibleFriends = t;
        
        this.setState({possibleFriends})
      }

      setUser = (user) =>{
        var {
            currentUser,
        } = this.state
        currentUser = user
        this.setState({currentUser})
      }
      



      addFriend = (index) => {
        const {
          currentFriends,
          possibleFriends,
        } = this.state
  
        // Pull friend out of possibleFriends
        const addedFriend = possibleFriends.splice(index, 1)
  
        // And put friend in currentFriends
        currentFriends.push(addedFriend)
  
        // Finally, update our app state
        this.setState({
          currentFriends,
          possibleFriends,
        })
      }


  
    render(){
        return (
            <AppNavigator
            screenProps={ {
                currentUser: this.state.currentUser,
                setUser: this.setUser,
                currentFriends: this.state.currentFriends,
                possibleFriends: this.state.possibleFriends,
                addFriend: this.addFriend,
              } }
            
            />
        )
    }
    
}
