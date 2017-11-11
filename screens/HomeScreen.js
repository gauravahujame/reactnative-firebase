import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ListView,
  AsyncStorage
} from 'react-native';
import { database } from '../firebase';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todoSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    }
    this.items = [];
  }

  componentDidMount(){
    AsyncStorage.getItem('user_id').then(uid => {
      this.userId = uid;
      this.itemsRef = database.child(this.userId);
      this.itemsRef.on('child_added', (dataSnapshot) => {
        this.items.push({ id: dataSnapshot.key, text: dataSnapshot.val().todo });
        this.setState({
          todoSource: this.state.todoSource.cloneWithRows(this.items)
        });
      });

      this.itemsRef.on('child_removed', (dataSnapshot) => {
        this.items.filter((x) => x.id !== dataSnapshot.key);
        this.setState({
          todoSource: this.state.todoSource.cloneWithRows(this.items)
        });
      });
    });
  }

  addTodo(){
    if(this.state.newTodo !== ''){
      this.itemsRef.push({
        todo: this.state.newTodo
      });
      this.setState({
        newTodo: ''
      })
    }
  }

  removeTodo(rowData){
    this.itemsRef.child(rowData.id).remove();
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={() => this.removeTodo(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.todoText}>{rowData.text}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            My Todos
          </Text>
        </View>
        <View style={styles.inputcontainer}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({newTodo: text})} value={this.state.newTodo}/>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.addTodo()}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Add!</Text>
          </TouchableHighlight>
        </View>
        <ListView
          dataSource={this.state.todoSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    color: '#FFFFFF',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  }
});
