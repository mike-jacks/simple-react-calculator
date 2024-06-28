import { useCallback, useEffect, useState } from "react";
import styles from "./Calculator.module.css";

import Button from "./Button/Button";

export default function Calculator() {
  const [display, setDisplay] = useState<string>("0");
  const [calcValue, setCalcValue] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [hasDot, setHasDot] = useState<boolean>(false);
  const [operator, setOperator] = useState<string | null>(null);
  const [operatorHit, setOperatorHit] = useState<boolean>(false);

  const buttons = ["AC", "+/-", "%", "/", "7", "8", "9", "X", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];

  function calculate(num: number, operator: string, strNum: string): number {
    const expression = `${num} ${operator} ${strNum}`;
    return new Function("return " + expression)();
  }

  const handleClick = useCallback(
    (value: string) => {
      console.log(value);
      switch (value) {
        case "AC":
          setCalcValue(0);
          setCurrentValue("0");
          setHasDot(false);
          setOperator(null);
          setDisplay("0");
          break;
        case "+/-":
          if (currentValue === "0") {
            break;
          }
          if (currentValue.includes("-")) {
            setCurrentValue((prevCurrentValue) => prevCurrentValue.slice(1));
          } else {
            setCurrentValue((prevCurrentValue) => "-" + prevCurrentValue);
          }
          break;
        case "%":
          setCurrentValue((prevCurrentValue) => String(Number(prevCurrentValue) / 100));
          break;
        case ".":
          setCurrentValue((prevCurrentValue) => {
            if (!hasDot && !String(prevCurrentValue).includes(value)) {
              setHasDot(true);
            } else if (!hasDot && String(prevCurrentValue).includes(value)) {
              setHasDot(true);
            } else if (hasDot && !String(prevCurrentValue).includes(value)) {
              setHasDot(false);
            }
            return prevCurrentValue;
          });
          break;
        case "X":
        case "/":
        case "-":
        case "+":
          value = value === "X" ? "*" : value;
          if (operator === null) {
            setOperator(value);
            setCalcValue(Number(currentValue));
            setCurrentValue("0");
            setHasDot(false);
            setOperatorHit(true);
          } else {
            setCalcValue((prevCalcValue) => calculate(prevCalcValue, operator, currentValue));
            setCurrentValue("0");
            setHasDot(false);
            setOperator(value);
          }
          break;
        case "=":
          if (operator === null) {
            break;
          }
          setCalcValue((prevCalcValue) => calculate(prevCalcValue, operator, currentValue));
          setCurrentValue("0");
          setDisplay(String(calcValue));
          setOperator(null);
          break;
        default:
          if (operatorHit) {
            setOperatorHit(!operatorHit);
            setCurrentValue(String(calcValue));
          }
          if (currentValue.length >= 28) {
            break;
          }
          if (hasDot) {
            setCurrentValue((prevValue) => {
              let result = "";
              if (prevValue.includes(".")) {
                result = prevValue + value;
              } else {
                result = prevValue + "." + value;
              }
              return result;
            });
          } else {
            if (currentValue === "0") {
              setCurrentValue(value);
              setDisplay(value);
              break;
            }
            setCurrentValue((prevValue) => prevValue + value);
            break;
          }
      }
    },
    [hasDot, currentValue, calcValue, operator, operatorHit]
  );

  useEffect(() => {
    setDisplay(String(currentValue));
  }, [currentValue]);

  useEffect(() => {
    setDisplay(String(calcValue));
  }, [calcValue]);

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>{display}</div>
      <div className={styles.buttons}>
        {buttons.map((button, i) => {
          return <Button key={i} label={button} handleClick={handleClick} />;
        })}
      </div>
    </div>
  );
}
