import styles from "./Button.module.css";

type ButtonProps = {
  label: string;
  handleClick: (value: string) => void;
};

export default function Button({ label, handleClick }: ButtonProps) {
  let buttonClass;

  switch (label) {
    case "AC":
    case "+/-":
    case "%":
      buttonClass = styles.darkButton;
      break;
    case "/":
    case "X":
    case "-":
    case "+":
    case "=":
      buttonClass = styles.orangeButton;
      break;
    case "0":
      buttonClass = styles.zeroButton;
      break;
    default:
      buttonClass = styles.defaultButton;
  }
  return (
    <button className={buttonClass} onClick={() => handleClick(label)}>
      {label}
    </button>
  );
}
