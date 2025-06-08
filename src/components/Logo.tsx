import './Logo.css';

const Logo = ({ text }: { text: string }) => {
  return (
    <div className="logo">
      <h1>{text}</h1>
    </div>
  );
};

export default Logo;
