import React, { Component } from 'react';
import './App.css';
import { Diagram } from 'devextreme-react';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.diagramRef = React.createRef();

    this.sendData = (stringData) => {
      var url = 'http://localhost:3004/diagram';
      //var data = JSON.parse(stringData);

      fetch(url, {
        method: 'POST', // or 'PUT'
        body: stringData, // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    }


    this.getData = () => {

      return fetch('http://localhost:3004/diagram')
        .then(function (response) {
          return response.json();
        });
    }
  }

  onChange = () => {
    var diagram = this.diagramRef.current.instance;
    var currentData = diagram.export();

    this.sendData(currentData);
   }

   componentDidMount = () => {
    var diagram = this.diagramRef.current.instance;
    this.getData()
    .then(function (myJson) {
      const data = JSON.stringify(myJson);
      diagram.import(data);
    });  
   };

  render() {
    return (
      <div>
        <button onClick={this.onChange}>Save</button>
        <Diagram id="diagram" ref={this.diagramRef} onChange={this.onChange}/>
      </div>
    );
  }
}

