import React from 'react';
import { View, Button, Text,
    AsyncStorage, TouchableOpacity,
    KeyboardAvoidingView, StyleSheet,
    Image, TextInput } from 'react-native';
import MainTabNavigator from '../navigation/MainTabNavigator';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements';
import { auth } from '../firebase'
import { NavigationActions } from 'react-navigation'

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', loading: false };
    }

    async saveLogin(userId) {
        try {
            await AsyncStorage.setItem('user_id', userId);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    resetNavigationStack(screen) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: screen })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    onLoginPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.saveLogin(user.uid);
                this.setState({ error: '', loading: false });
                this.resetNavigationStack('Main');
            })
            .catch(() => {
                this.setState({ error: 'Authentication Failed. Try Again!', loading: false });
            })
    }

    onSignUpPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.saveLogin(user.uid);
                this.setState({ error: '', loading: false });
                this.resetNavigationStack('Main');
            })
            .catch(() => {
                this.setState({ error: 'Authentication Failed. Try Again!', loading: false });
            })
    }

    renderButtonOrLoading() {
        if (this.state.loading) {
            return <Text style={styles.centerText}>Loading</Text>
        }
        return <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onLoginPress.bind(this)}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onSignUpPress.bind(this)}>
                <Text style={styles.buttonText}>SIGNUP</Text>
            </TouchableOpacity>
        </View>
    }

    render() {
        return <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo}
                    source={require('../images/logo.png')} />
                    <Text style={styles.title}>ToDo App made using React Native and Firebase</Text>
            </View>
            <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                value={this.state.email}
                placeholder='john.doe@gmail.com'
                placeholderTextColor="rgba(255,255,255,0.7)"
                underlineColorAndroid='rgba(0,0,0,0)'
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={email => this.setState({ email })} />
            <TextInput
                style={styles.input}
                value={this.state.password}
                secureTextEntry
                placeholder='******'
                placeholderTextColor="rgba(255,255,255,0.7)"
                underlineColorAndroid='rgba(0,0,0,0)'
                returnKeyType="go"
                ref={(input) => this.passwordInput = input}
                onChangeText={password => this.setState({ password })} />
            <Text style={styles.centerText}>{this.state.error}</Text>
            {this.renderButtonOrLoading()}
            </View>
        </KeyboardAvoidingView>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 160,
        textAlign: 'center',
        opacity: 0.9
    },
    formContainer: {
        margin: 30
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10 
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        marginBottom: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    centerText: {
        textAlign: 'center',
        marginBottom: 5
    }
})