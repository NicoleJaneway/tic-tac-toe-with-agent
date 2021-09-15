import "./styles.css";

export default function ResetButton({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}
