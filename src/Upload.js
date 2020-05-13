import React, { Component } from 'react';

class Upload extends Component {

    onChange = (event) => {
        event.preventDefault();
        let files = event.target.files;
        console.log(files[0].name);
        var formData = new FormData();
        formData.append('file', files[0]);
        const url = 'http://localhost:4000/datasets';
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => console.log('Success:', response))
            .catch(error => console.error('Error:', error));
    }

    onSubmit = (event) => {
        event.preventDefault();
    } 

    render() {
        return (
            <form method="post" action="http://localhost:4000/datasets" >
                    <input type='file' name='file' onChange={(event) => this.onChange(event)} />
                    <button onSubmit={(e) => {this.onSubmit(e);}}>submit form</button>
            </form>
            
        );
    }
}

export default Upload;