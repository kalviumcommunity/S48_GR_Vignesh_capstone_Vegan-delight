import React from "react";
import Options from "./options";
import Welcome from "./welcome";
import AboutUs from "./aboutUs";
import HowItWorks from "./howItWorks";
import Footer from "./footer";
import "../../styles/landingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Options />
      <Welcome />
      <AboutUs />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default LandingPage;
