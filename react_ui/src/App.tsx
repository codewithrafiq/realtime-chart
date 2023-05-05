import Message from "./components/Message";
import RealTimeChart from "./components/RealTimeChart";

const App = () => {
  return (
    <div style={{ padding: 15 }}>
      <Message />
      <RealTimeChart />
    </div>
  );
};

export default App;
