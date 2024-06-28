import Calculator from "../Calculator/Calculator";
import styles from "./App.module.css";

function App() {
  return (
    <>
      <div className={styles.root}>
        <header>
          <h1>Simple Calculator</h1>
        </header>
        <body>
          <Calculator />
        </body>
        <footer className={styles.footer}>
          <p>Created by Mike Jacks 2024</p>
        </footer>
      </div>
    </>
  );
}

export default App;
