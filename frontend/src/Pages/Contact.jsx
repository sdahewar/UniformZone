import React from "react";
import "./CSS/Contact.css"; // Import your CSS file
import bnath from "./../Components/Assets/img/bipro.jpg";
import sshekh from "./../Components/Assets/img/sharuk.jpeg";
import subhro from "./../Components/Assets/img/subhro.jpeg";
import bijon from "./../Components/Assets/img/bijon.jpeg";
import sahul from "./../Components/Assets/img/sahul.jpg";

const Contact = () => {
  return (
    <div>
      {/* <section className="header">
        <div className="logo"></div>
        <div>
          <ul id="navbar">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="shop.html">Shop</a>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a className="active" href="contact.html">
                Contact
              </a>
            </li>
            <a href="#" id="close">
              <i className="far fa-times"></i>
            </a>
          </ul>
        </div>
        <div id="mobile">
          <i id="bar" className="fas fa-outdent"></i>
        </div>
      </section> */}

      <section id="page-header" className="about-header">
        <h2>#Let's_Talk</h2>
        <p>And join Student Outfit Community</p>
      </section>

      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Visit One of Our Store location and Contect Us</h2>
          <h3>Location</h3>
          <div>
            <li>
              <i className="fal fa-map"></i>
              <p>Location of our Store......</p>
            </li>
            <li>
              <i className="far fa-envelope"></i>
              <p>biprojitnath@gmail.com</p>
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              <p>123456789....</p>
            </li>
            <li>
              <i className="far fa-clock"></i>
              <p>Website timeing...</p>
            </li>
          </div>
        </div>
        {/* Map Section */}
        <section id="map" className="section-p1">
          <h2>Location Map</h2>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.3737933383454!2d92.7885364760459!3d24.81688754699852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374e4a6f1ab5ac63%3A0x6f636b07d57b89a8!2sGC%20College%20Rd%2C%20Ambicapatty%2C%20Silchar%2C%20Assam!5e0!3m2!1sen!2sin!4v1709473866381!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </section>

      {/* Contact Form Section */}
      <section id="form-details" className="section-p1">
        <form action="">
          <span>Write a Message</span>
          <h2>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
            similique
          </h2>
          <div className="form-group">
            <input type="text" placeholder="Your Name" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="E-mail" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Subject" />
          </div>
          <div className="form-group">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button className="col">Submit</button>
        </form>
      </section>

      {/* <section id="login" className="section-p1 section-m1">
        <div className="loginup">
          <h4>Sign Up and Verification</h4>
          <p>
            For <span>Security</span> Purposes.
          </p>
        </div>
        <div className="form">
          <input type=" text" placeholder="Enter Your E-mail Address" />
          <button className="normal1">Register</button>
        </div>
      </section> */}

      {/* Team Members Section */}
      <section className="team-section">
        <div className="team-member">
          <div className="team-member-image">
            <img src={bnath} alt="Biprojit Nath" />
          </div>
          <div className="team-member-details">
            <h4>BIPROJIT NATH</h4>
            <p>Website Maker</p>
            <p>Phone: +123456789...</p>
            <p>Email: biprojitnath2003@gmail.com</p>
          </div>
        </div>
        <div className="team-member">
          <div className="team-member-image">
            <img src={sshekh} alt="Sharuk Shekh" />
          </div>
          <div className="team-member-details">
            <h4>SHARUK SHEKH</h4>
            <p>Website Maker</p>
            <p>Phone: +123456789...</p>
            <p>Email: shekhsharuk.khan2004@gmail.com</p>
          </div>
        </div>
        <div className="team-member">
          <div className="team-member-image">
            <img src={subhro} alt="Subhrojyoti Paul" />
          </div>
          <div className="team-member-details">
            <h4>SUBHROJYOTI PAUL</h4>
            <p>Website Maker</p>
            <p>Phone: +123456789...</p>
            <p>Email: subhrojyotipaul2003@gmail.com</p>
          </div>
        </div>
        <div className="team-member">
          <div className="team-member-image">
            <img src={bijon} alt="Bijan Kumar Barman" />
          </div>
          <div className="team-member-details">
            <h4>BIJAN KUMAR BARMAN</h4>
            <p>Website Maker</p>
            <p>Phone: +123456789...</p>
            <p>Email: bijanbarman713@gmail.com</p>
          </div>
        </div>
        <div className="team-member">
          <div className="team-member-image">
            <img src={sahul} alt="Sahul Kumar Singh" />
          </div>
          <div className="team-member-details">
            <h4>SAHUL KUMAR SINGH</h4>
            <p>Website Maker</p>
            <p>Phone: +123456789...</p>
            <p>Email: sahulkumarsingh90@gmail.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
