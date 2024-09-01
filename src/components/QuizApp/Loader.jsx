export default function Loader() {
  return (
    <div className="loader-container"  style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '4rem',
      gap: '1.6rem',
      color: 'var(--color-medium)',
      fontSize: '1.4rem',
    }}>
      <div className="loader" style={{
    width: '50px',
    height: '24px',
    background: `radial-gradient(circle closest-side, currentColor 90%, transparent) 0% 50%,
                 radial-gradient(circle closest-side, currentColor 90%, transparent) 50% 50%,
                 radial-gradient(circle closest-side, currentColor 90%, transparent) 100% 50%`,
    backgroundSize: 'calc(100% / 3) 12px',
    backgroundRepeat: 'no-repeat',
    animation: 'loader 1s infinite linear',
  }}></div>
      <p>Loading questions...</p>
    </div>
  );
}
