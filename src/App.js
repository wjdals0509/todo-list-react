import { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./App.module.css";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [time, setTime] = useState("00:00");
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDo("");
    setToDos((currentArray) => [...currentArray, toDo]);
  };
  const deleteBtn = (index) => {
    setToDos(toDos.filter((item, todoIndex) => index !== todoIndex));
  };
  const currentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setTime(`${hours}시 ${minutes}분`);
  };
  const startTime = () => {
    setInterval(currentTime, 1000);
  };
  startTime();
  return (
    <div className={styles.center}>
      <div className={styles.top}>
        <div className={styles.h1}>📝오늘의 할일은 {toDos.length}개📝</div>
        <div className={styles.time}>⏰ {time}</div>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            value={toDo}
            type="text"
            placeholder="할일을 적어주세요"
          />
          <Button type="button" className={styles.btn} variant="light">
            ➕
          </Button>
        </form>
      </div>
      <hr />
      <div className={styles.scroll}>
        <ul style={{ padding: 0 }}>
          {toDos.map((item, index) => (
            <li key={index}>
              {item}
              <button
                className={styles.remove}
                onClick={() => deleteBtn(index)}
              >
                ❎
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
