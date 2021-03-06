import React from 'react';
import ReactDOM from 'react-dom';
import RegisterUser from './components/RegisterUser.jsx';
import Upload from './components/Upload.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationMode: false
    }

    this.handleRegisterUserClick = this.handleRegisterUserClick.bind(this);
    this.handleCreateUserClick = this.handleCreateUserClick.bind(this);
  }

  handleRegisterUserClick(username, email, password) {
    // this should communicate with the Node server and then pass to MongoDB
    // salt the password and then pass it into the axios post request
    (async () => {
      try {
        const response = await axios.post('/items', { username, email, saltedPassword });
        const data = response.data;

        if (data) {
          this.setState({
            registrationMode: true
          })
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }

  handleCreateUserClick() {
    this.setState({
      registrationMode: true
    })
  }

  render () {
    if (this.state.registrationMode) {
      return (
        <div>
          <RegisterUser handleRegisterUserClick={this.handleRegisterUserClick}/>
        </div>
      )
    } else {
    return (<div>
        <button>
          Create User
        </button>
      <h1>DUMMY EVENT TEXT</h1>
      <Upload />
    </div>)
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));