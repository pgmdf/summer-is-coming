import React, { Component } from 'react';



class Editprofile extends Component {

  state = {

  }

  // you can use for every input field
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render() {
    return (
      <div>
        <img src="https://ksb-friesland.de/wp-content/uploads/2017/05/profile-default.jpg"></img>
        <form action="/profile/addprofilepic" method="POST" enctype="multipart/form-data"> <br />
          <input type="file" name="my-photo" id="" /> <br></br>
          <button type="submit">Upload</button>
        </form>

      </div>

    )
  }

}

export default Editprofile;