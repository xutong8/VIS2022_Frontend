import './App.css';
import FileUploadTable from './components/FileUploadTable';
import FlowChart from './components/FlowChart';
import '@/styles/index.less';

function App() {
  return (
    <div className="App">
      <FileUploadTable />
      <FlowChart />
    </div>
  );
}

export default App;
