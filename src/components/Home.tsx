import React from "react";
import { useAtom } from "jotai";
import { countAtom } from "../jotai/store";
const Home = () => {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button
        className="p-10 border border-red-600"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};

export default Home;
