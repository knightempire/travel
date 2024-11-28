import React from "react";
import Footer from "./Footer";

const App: React.FC = () => {
  const appStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const mainContentStyles: React.CSSProperties = {
    flex: 1,
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  };

  return (
    <div style={appStyles}>
      <div style={mainContentStyles}>
        {/* Your main content */}
      </div>
      <Footer />
    </div>
  );
};

export default App;
