import React from 'react';
import { withRouter } from 'react-router-native';
import { Text, Platform, Dimensions } from 'react-native';
import { List, ListItem, Left, Body } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const navs = [
  { name: 'Yahtzee', path: '/', icon: "dice-6" },
  { name: 'Scores', path: '/scores', icon: "clipboard-alert" },
  { name: 'Login', path: '/login', icon: "login" },
  { name: 'Register', path: '/register', icon: "sign-text" }
]

const navigate = (close, history, path) => {
  close();
  history.push(path);
}

const Sidebar = ({ close, history }) => (
  <List style={styles.drawer}>
    { navs.map( (nav, i) => {
        return (
          <ListItem icon key={i}>
            <Left>
              <MaterialCommunityIcons name={nav.icon} color="white" size={30} />
            </Left>
            <Body>
              <Text
                onPress={() => navigate(close, history, nav.path) }
                style={styles.text}
              >
                {nav.name}
              </Text>
            </Body>
          </ListItem>
        )
      })
    }
  </List>
)

const styles = {
  drawer: {
    height: deviceHeight / 3.5,
    width: deviceWidth / 1.4,
    marginBottom: 10,
    backgroundColor: '#1c4412',
    borderColor: '#000',
    borderWidth: 5,
    borderRadius: 10,
  },
  text: {
    fontWeight: (Platform.OS === 'ios') ? '700' : '600',
    fontSize: 16,
    color: '#fff',
  },
}

export default withRouter(Sidebar);
