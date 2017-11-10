import React from 'react';
import { View, Button, Text } from 'react-native';
import MainTabNavigator from '../navigation/MainTabNavigator';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements';
import { auth } from '../firebase'

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', loading: false };
    }

    onLoginPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password)
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
        auth.createUserWithEmailAndPassword(email, password)
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
            <FormInput
                value={this.state.email}
                placeholder='john.doe@gmail.com'
                onChangeText={email => this.setState({ email })} />
            <FormLabel>Password</FormLabel>
            <FormInput
                value={this.state.password}
                secureTextEntry
                placeholder='******'
                onChangeText={password => this.setState({ password })} />
            <Text>{this.state.error}</Text>
            {this.renderButtonOrLoading()}
        </View>
    }
}