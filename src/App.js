import React, { Component } from 'react';
import './App.css';

export default class componentName extends Component {
  constructor(props) {
    super(props);

    this.sendData = () => {
      var url = 'http://localhost:3004/posts';
      var data = {username: 'example', username2: 'example'};

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
    }

    
    this.getData = () => {
      
      return fetch('http://localhost:3004/posts')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
    }
  }
  
  render() {
    return (
      
    <div>
      <button onClick = {this.sendData}>Click</button>
      <button onClick = {this.getData}>Click</button>
    </div>
    );
  }
}

