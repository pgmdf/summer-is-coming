import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";


class Contact extends Component {
  state = {

  };


  render() {

    return (
      <div>
        <h1>Contact information</h1>

        <h3>This website has been handcrafted with love but not enough time in Berlin by these 4 wonderful people.<br /><br /></h3>


        <div class="allContacts">
          <div class="singleContact">
            <img height="200px" width="200px" src="https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png"></img>
            <div class="namebox">Pia
<a href="https://www.linkedin.com/in/pia-guehne/"><img height="30px" src="https://image.flaticon.com/icons/png/512/174/174857.png"></img></a>
            </div>
          </div>
          <div class="singleContact">
            <img height="200px" width="200px" src="https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png"></img>
            <div class="namebox">Damaris
<a href="https://www.linkedin.com/in/damaris-goebel/"><img height="30px" src="https://image.flaticon.com/icons/png/512/174/174857.png"></img></a>
            </div>
          </div>
          <div class="singleContact">
            <img height="200px" width="200px" src="https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png"></img>
            <div class="namebox">Sonja
<a href="https://www.linkedin.com/in/sonja-lesch/"><img height="30px" src="https://image.flaticon.com/icons/png/512/174/174857.png"></img></a>
            </div>
          </div>
          <div class="singleContact">
            <img width="200px" src="https://lh3.googleusercontent.com/5QBXmqhnEvB77T-MBoLUKulKOquBhwhZ_bmvjOmbGslJf0vLlaGlZmax1tTf_Vk9cr8qUWOmNfJ-bShoPkA0hpn65pjagWn8fS44OSzmVXV8T0mrmAhHNPCTApKlVFcD3nt7gk1qrT4=w2400"></img>
            <div>
              <div class="namebox">Sjard
<a href="https://www.linkedin.com/in/sjard-geiersbach-098574127/"><img height="30px" src="https://image.flaticon.com/icons/png/512/174/174857.png"></img></a>
              </div>
            </div>
          </div>
        </div>


        <h3>Contact us for any questions or inquiries at:</h3>
        <div class="hardContactFacts">
          <div class="singleContactInfo">
            <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-mailbox" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
              <path fill-rule="evenodd" d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854z" />
              <path d="M5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
            </svg>
            <div>sjard.geiersbach@gmail.com</div>
          </div>

          <div class="singleContactInfo">
            <svg width="3em" height="3em" viewBox="0 0 16 16" class="bi bi-telephone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z" />
            </svg>
            <div>+49 177 1234567</div>
          </div>
        </div>

      </div>
    );
  }
}

export default Contact;
