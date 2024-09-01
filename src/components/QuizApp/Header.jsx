import ReactLogo from "./React_logo1.png"; // Import the image
import appLogo from "../../assets/images/logo.png"
function Header() {
  return (
    <header className="app-header">
      <img src={appLogo} alt="Reactlogo"  height={30} width={170} />
      <div style={{
      fontFamily: '"Codystar", sans-serif',
      fontSize: '45px',
      textAlign: 'center',
      marginTop:"12px"
    }}>Quiz</div>
    </header>
  );
}

export default Header;
