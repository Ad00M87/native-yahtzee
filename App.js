import React, { Component } from 'react';
import Expo from 'expo';
import { StyleSheet, View, Text } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Drawer
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { NativeRouter, Route, Switch } from 'react-router-native';
import Yahtzee from './components/Yahtzee';
import Login from './components/Login';
import Register from './components/Register';
import Scores from './components/Scores';
import Sidebar from './components/Sidebar';

class App extends Component {
  state = { drawerOpen: false, }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ fontLoaded: true })
  }

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen }, () => {
      if (this.state.drawerOpen)
        this.openDrawer();
      else
        this.closeDrawer();
    });
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
    return (
        <NativeRouter>
          <Container>
            <Header style={styles.header}>
              <Left>
                <Button transparent onPress={() => this.toggleDrawer()}>
                  <Ionicons name='md-menu' color="white" size={30}/>
                </Button>
              </Left>
              <Body>
                <Title style={styles.title}>Yahtzee</Title>
              </Body>
              <Right />
            </Header>
            <Content padder>
              <Drawer
                ref={ ref => { this.drawer = ref }}
                content={<Sidebar close={() => this.toggleDrawer()} navigator={this._navigator} />}
                onClose={() => this.closeDrawer()}
              >
              </Drawer>
              { this.state.drawerOpen ? null :
                <View>
                  <Switch>
                    <Route exact path="/" component={Yahtzee} />
                    <Route exact path="/scores" component={Scores} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                  </Switch>
                </View>
              }
            </Content>
          </Container>
        </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#911904',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 30,
    textShadowColor: "#a79d20",
    textShadowRadius: 2,
    textShadowOffset: {width: 2, height: 2},
  },
});

export default App;
