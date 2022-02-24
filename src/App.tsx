import "@/styles/index.less";
import styles from "./App.less";
import BasicLayout from "./components/BasicLayout";

function App() {

  return (
    <div className={styles.app}>
      <BasicLayout />
    </div>
  );
}

export default App;
