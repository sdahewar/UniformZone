import React from "react";
import "./CSS/About.css"; // Import your CSS file
import bnath from "./../Components/Assets/img/bipro.jpg";
import sshekh from "./../Components/Assets/img/sharuk.jpeg";
import subhro from "./../Components/Assets/img/subhro.jpeg";
import bijon from "./../Components/Assets/img/bijon.jpeg";
import sahul from "./../Components/Assets/img/sahul.jpg";

const About = () => {
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
              <a className="active" href="about.html">
                About
              </a>
            </li>
            <li>
              <a href="./Contact">Contact</a>
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
        <h2>#KnowUs</h2>
        <p>And join Student Outfit Community</p>
      </section>

      <section id="about-head" className="section-p1">
        <img src="img/about.jpeg" alt="" />
        <div>
          <h1>Welcome to our website</h1>
          <h4>
            Our Website is a professional students uniform website. We developed
            the website for the Barak valley school and college going students
            where they can get their schools and colleges uniforms through this
            website. By offering various options to our users such as colour,
            sizes other accessories and ensure that user could find the perfect
            uniform for them and also good quality and affordable price. We are
            dedicated to providing you best outfit and with a focus on
            dependability and school and College uniforms. We are working to
            turn our passion for student uniforms into booming online platform.
            We hope all of you enjoy students outfit as much as we offering them
            to all students. Thanks for visiting our Students outfit.
          </h4>
          {/* <marquee loop="-1" scrollamount="5" width="100%">
            We Are team Computer Science(CS)
          </marquee> */}
        </div>
      </section>

      <section id="text-box">
        <h2>Our Developers</h2>
        <p>We Are From Gurucharan College (GC)</p>
      </section>

      <section id="feature" className="section-p1">
        <div className="img-box">
          <img src={bnath} alt="" />
          <h4>BIPROJIT NATH</h4>
        </div>
        <div className="img-box">
          <img src={sshekh} alt="" />
          <h4>SHARUK SHEKH</h4>
        </div>
        <div className="img-box">
          <img src={subhro} alt="" />
          <h4>SUBHROJYOTI PAUL</h4>
        </div>
        <div className="img-box">
          <img src={bijon} alt="" />
          <h4>BIJAN KUMAR BARMAN</h4>
        </div>
        <div className="img-box">
          <img src={sahul} alt="" />
          <h4>SAHUL KUMAR SINGH</h4>
        </div>
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

      <footer className="section-p1">
        <div className="colll">
          <img className="logo" src="img/web3.png" alt="" />
          <h4>Contact</h4>
          <p>
            <strong>Address: </strong> 123456
          </p>
          <p>
            <strong>phone: </strong>123456
          </p>
          <p>
            <strong>Hours: </strong>123456
          </p>
          <div className="Follow">
            <h4>Follow Us</h4>
            <div className="icon">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-youtube"></i>
            </div>
          </div>
        </div>
        {/* <div className="colll">
          <h4>About </h4>
          <a href="#">About Us</a>
          <a href="#">Terms & Condition</a>
          <a href="#">Contect us</a>
        </div>

        <div className="colll">
          <h4>My Account</h4>
          <a href="#">Sign In</a>
          <a href="#">Track My Order</a>
          <a href="#">View Cart</a>
          <a href="#">My Wishlist</a>
          <a href="#">Help</a>
        </div> */}
      </footer>
    </div>
  );
};

export default About;
