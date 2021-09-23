import React from 'react';
import './App.css';
import axios from 'axios';
class App extends React.Component { // Class imports Component from React
state = {
  data: null
}

componentDidMount () {
                                                  //Calls catch if there's an error
  axios.get('http://localhost:5000') //Pass in api endpoint
    .then((response) => {
      this.setState({
        data: response.data //set state of data above
      })
    })
    .catch(error) => {
      console.error('Error fetching data: ${error}');
    }

}





  render() {
    return (
    <div className="App">
      <header className="App-header">
        Good Things
      </header>
      {this.state.data}
    </div>
  );
}
}

export default App;
