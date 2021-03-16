import { useEffect, useState } from "react";

const InputElement = () => {
  const random_boolean = Math.random() >= 0.5;
  const [inputText, setInputText] = useState("");
  const [historyList, setHistoryList] = useState([]);

  const [isLoading, setIsloading] = useState(random_boolean === true);

  useEffect(() => {
    const timer = setTimeout(function () {
      setIsloading(false);
    }, 2000);

    return () => clearTimeout(timer);
  });

  return isLoading ? (
    "Loading...."
  ) : (
    <div>
      <input
        placeholder="Enter Some Text"
        onChange={(e) => {
          setInputText(e.target.value);
          setHistoryList([...historyList, e.target.value]);
        }}
      />
      <br />
      {inputText}
      <hr />
      <br />
      <ul>
        {historyList.map((rec) => {
          return <div>{rec}</div>;
        })}
      </ul>
    </div>
  );
};

export default InputElement;
