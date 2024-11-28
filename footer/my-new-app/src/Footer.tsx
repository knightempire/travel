import React from "react";

const Footer: React.FC = () => {
  const footerStyle: React.CSSProperties = {
    backgroundColor: "#0A0A14",
    color: "#FFFFFF",
    padding: "60px 20px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    fontFamily: "'Poppins', sans-serif",
    marginLeft: "0px",
  };

  const mainContentStyle: React.CSSProperties = {
    flex: "1",
    maxWidth: "400px",
    marginRight: "10px",
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    backgroundColor: "#FF5722",
    color: "#FFFFFF",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  };

  const boxContainerStyle: React.CSSProperties = {
    display: "flex",
    flex: "2",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    columnGap: "30px",
  };

  const sectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minWidth: "120px",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#FFFFFF",
  };

  const linkStyle: React.CSSProperties = {
    color: "#B0B0B0",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.3s ease",
  };

  const socialSectionStyle: React.CSSProperties = {
    marginTop: "30px",
    textAlign: "center",
    width: "100%",
  };

  const socialStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "15px",
  };

  const iconStyle: React.CSSProperties = {
    color: "#FFFFFF",
    fontSize: "22px",
    textDecoration: "none",
    transition: "color 0.3s ease",
  };

  return (
    <footer style={footerStyle}>
      {/* Main Content Section */}
      <div style={mainContentStyle}>
        <h1>Explore the World with TravelBuddy</h1>
        <p>
          Discover the best destinations, tips, and travel deals. Your next adventure awaits!
        </p>
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FF7043")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FF5722")}
        >
          Plan Your Trip
        </button>
      </div>

      {/* Box Container for Links */}
      <div style={boxContainerStyle}>
        {/* Platform Section */}
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Platform</h3>
          <a
            href="#about"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            About Us
          </a>
          <a
            href="#destinations"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            Destinations
          </a>
          <a
            href="#guides"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            Travel Guides
          </a>
          <a
            href="#contact"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            Contact Us
          </a>
        </div>

        {/* Resources Section */}
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Resources</h3>
          <a
            href="#tips"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            Travel Tips
          </a>
          <a
            href="#insurance"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            Travel Insurance
          </a>
          <a
            href="#newsletter"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            Newsletter
          </a>
          <a
            href="#faq"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            FAQs
          </a>
        </div>

        {/* Legals Section */}
        <div style={sectionStyle}>
          <h3 style={headingStyle}>Legals</h3>
          <a
            href="#terms"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            Terms of Service
          </a>
          <a
            href="#privacy"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            Privacy Policy
          </a>
          <a
            href="#cookies"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            Cookie Policy
          </a>
          <a
            href="#licensing"
            style={linkStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#B0B0B0")}
          >
            Licensing
          </a>
        </div>
      </div>

      {/* Social Media Section */}
      <div style={socialSectionStyle}>
        <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>Follow us on:</h4>
        <div style={socialStyle}>
          <a
            href="#twitter"
            style={iconStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#FFFFFF")}
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#facebook"
            style={iconStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#FFFFFF")}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#instagram"
            style={iconStyle}
            onMouseOver={(e) => (e.currentTarget.style.color = "#FF7043")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#FFFFFF")}
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
