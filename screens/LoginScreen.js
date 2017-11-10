import React from 'react';
import { View, Button, Text } from 'react-native';
import * as firebase from 'firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements';

firebase.initializeApp({
    apiKey: "AIzaSyBjoTOHGREN02gf457lgKVjKD8DZfTvPDs",
    authDomain: "reactnative-todo-9f7f0.firebaseapp.com",
    databaseURL: "https://reactnative-todo-9f7f0.firebaseio.com",
    projectId: "reactnative-todo-9f7f0",
    storageBucket: "reactnative-todo-9f7f0.appspot.com",
    messagingSenderId: "1000990672369"
});

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', loading: false };
    }

    onLoginPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
                this.props.navigation.navigate('Main');
            })
            .catch(() => {
                this.setState({ error: 'Authentication Failed', loading: false });
            })
    }

    onSignUpPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
                this.props.navigation.navigate('Main');
            })
            .catch(() => {
                this.setState({ error: 'Authentication Failed', loading: false });
            })
    }

    renderButtonOrLoading() {
        if (this.state.loading) {
            return <Text>Loading</Text>
        }
        return <View>
            <Button onPress={this.onLoginPress.bind(this)} title='Login' />
            <Button onPress={this.onSignUpPress.bind(this)} title='Sign Up' />
        </View>
    }

    render() {
        return <View>
            <FormLabel>Email</FormLabel>
            <FormInput onChangeText={email => this.setState({ email })} />
            <FormLabel>Password</FormLabel>
            <FormInput onChangeText={password => this.setState({ password })} />
            {this.renderButtonOrLoading()}
        </View>
    }
}