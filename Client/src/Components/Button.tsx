type ButtonItem = {
  name: string;
  className?: string;
};

const Button: React.FC<ButtonItem> = ({ name, className = "" }) => {
  return (
    <div>
      <button className={`${className}`}>{name}</button>
    </div>
  );
};

export default Button;
