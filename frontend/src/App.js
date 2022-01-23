import './App.css';
import { Component } from 'react';

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  
  render() {
    return (
    <div className="App">
      <p>yes</p>
      {/* {this.state.users.map(user =>
        <div>{user.message}</div>)} */}
      <p>{this.state.users[0]} {this.state.users[1]}</p>
    </div>
  )};
}

export default App;
