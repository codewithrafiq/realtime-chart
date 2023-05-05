import { useEffect, useState } from "react";
import { socket } from "../service/socket";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    socket.emit("createWschat", value, () => {
      setIsLoading(false);
      setValue("");
    });
  }

  useEffect(() => {
    socket.on("createWschat", (data) => {
      console.log("createWschat--react--->", data);
    });
    return () => {
      socket.off("createWschat");
    };
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
