import { useEffect, useState } from "react";
import { socket } from "../service/socket";
import { ConnectionManager } from "./ConnectionManager";
import { ConnectionState } from "./ConnectionState";
import { Events } from "./Events";
import { MyForm } from "./MyForm";

export default function Message() {
  const [isConnected, setIsConnected] = useState<Boolean>(socket.connected);
  const [fooEvents, setFooEvents] = useState<Array<any>>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: any) {
      setFooEvents(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}
