import React, { Component } from 'react';
import axios from 'axios';

class Editprofile extends Component {

  state = {
    title: '',
    description: '',
    image_url: 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg'
  }

  // you can use for every input field
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }



  handleFileUpload = (e) => {

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    axios.post('/api/image', uploadData).then((resp) => {

      this.setState({
        image_url: resp.data.image_url
      })
    })

  }

  render() {
    return (
      <div>
      <img src={this.state.image_url} height="100px" width="100px" alt="profile pic"></img>
        <input
          type="file"
          onChange={this.handleFileUpload} />
      </div>
    )
  }

}

export default Editprofile;