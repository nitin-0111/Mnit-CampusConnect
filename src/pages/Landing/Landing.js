import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./Landing.css";
import { Link } from "react-router-dom";
import logo from "../../assets/img/CampusConnect-logos/CampusConnect-logos_white.png";
const Landing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const contributors = [
    { name: "Contributor 1", image: "/LandingPage/cooler 1.png" },
    { name: "Contributor 2", image: "/LandingPage/cycle 3.png" },
    { name: "Contributor 3", image: "/LandingPage/book 1.png" },
    { name: "Contributor 4", image: "/LandingPage/headphones.png" },
    { name: "Contributor 5", image: "/LandingPage/kettle.png" },
    { name: "Contributor 6", image: "/LandingPage/speaker 1.png" },
    { name: "Contributor 7", image: "/LandingPage/headphone 2.png" },
    { name: "Contributor 8", image: "/LandingPage/w-speaker2.png" },
    { name: "Contributor 9", image: "/LandingPage/airpods.png" },
    { name: "Contributor 10", image: "/LandingPage/kettle 2.png" },
    { name: "Contributor 11", image: "/LandingPage/calculator.png" },
    { name: "Contributor 12", image: "/LandingPage/cycle 2.png" },
    { name: "Contributor 13", image: "/LandingPage/earbuds.png" },
    { name: "Contributor 14", image: "/LandingPage/book 2.png" },
    { name: "Contributor 15", image: "/LandingPage/watch.png" },
    { name: "Contributor 16", image: "/LandingPage/w-speaker1.png" },
    { name: "Contributor 17", image: "/LandingPage/razor 1.png" },

  ];
  const Rules = [
    { name: "rule 1", image: "/LandingPage/rules.png" },
  ];

  const contributorImages = [
    { name: "Himanshu Omar", image: "/Avatars/Image 1.png", linkedin: "https://www.linkedin.com/in/himanshu-omar-4a71b2214/" },
    { name: "nsp", image: "/Avatars/Image 2.png", linkedin: "" },
    { name: "Nimish Toshniwal", image: "/Avatars/Image 4.png", linkedin: "https://www.linkedin.com/in/nimish-toshniwal-717159213/" },
    { name: "Durgesh Saini", image: "/Avatars/Image 3.png", linkedin: "https://www.linkedin.com/in/durgeshsaini/" },
  ];

  const handleImageChange = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % contributors.length);
  };

  // Automatically switch images every 3 seconds
  useEffect(() => {
    const interval = setInterval(handleImageChange, 1600);
    return () => clearInterval(interval);
  });

  // *** *** Animation in Header Section  *** *** ***
  const [animatedWords, setAnimatedWords] = useState([]);

  useEffect(() => {
    const words = "for campus life.".split(" ");

    setAnimatedWords(
      words.map((word, index) => (
        <span key={index} style={{ animationDelay: `${0.3 * index}s` }}>
          {word}
        </span>
      ))
    );
  }, []);

  return (
    <div className="landing">
      <img src={logo} alt="Header logo" />
      <header>
        <div className="about">
          <div className="about-text">
            {/* <h2>Our Website</h2> */}
            <p>Connect with college students to buy or sell products among peers. Empowering community transactions </p>
            <p className="hero-effect">{animatedWords}</p>
          </div>
          <div className="about-buttons">
            <div className="button-gap">
              <Link to="/login">
                <Button variant="contained" color="primary">
                  Login
                </Button>
              </Link>
            </div>
            <Link to="/signup">
              <Button variant="outlined" sx={{ color: "primary", background: "white" }}>
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
        <div className="images">
          <img
            src={`${process.env.PUBLIC_URL}${contributors[currentImageIndex].image}`}
            alt={`Contributor ${currentImageIndex + 1}`}
          />
        </div>
      </header>

      <section className="rules">
        <div className="section-header">
          <h2 className="section-title">Request to users</h2>
        </div>
        <div className="maintheme">
          <img src={`${process.env.PUBLIC_URL}${Rules[0].image}`} alt="Decoration" />
          <div className="content-wrapper">
            <div className="rules-list">
              <ul style={{ listStyleType: 'disc' }}>
                <li className="rule">This site is only for our college so make sure you register using the MNIT mail Id only.
                </li>
                <hr />
                <li className="rule">
                  Provide valid contact details during registration else nobody would be able to contact you for your product.
                </li>
                <hr />
                <li className="rule">
                  Once registered, please check your email for the verification of the registered mail Id.
                </li>
                <hr />
                <li className="rule">
                  Do not post any irrelevant post else the user may get deleted.
                </li>
                <hr />
                <li className="rule">
                  For the best experience, use a computer or switch to desktop mode on mobile.
                </li>
                <hr />
                <li className="rule">
                  Once you find your owner, then do mail about it to us at <b>campusconnect.social@gmail.com</b>  to remove it from the website.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="contributors">
        <h2>Our Team</h2>
        <div className="contributors-list">
          {contributorImages.map((contributor, index) => (
            <div className="contributor-item" key={index}>
              <div className="contributor-image-container">
                <a href={contributor.linkedin} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`${process.env.PUBLIC_URL}${contributor.image}`}
                    alt={contributor.name}
                    className="contributor-image"
                  />
                </a>
              </div>
              <p>
                <a href={contributor.linkedin} target="_blank" rel="noopener noreferrer">{contributor.name}
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="footer">
        <p>Made with 💓 by CampusConnect Team for MNIT.</p>
      </section>
    </div>
  );
};

export default Landing;
