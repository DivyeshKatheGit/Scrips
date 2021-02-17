import './css/App.css';
import ScripsHeader from './components/ScripsHeader';
import ScripsBody from './components/ScripsBody';
import ScripsFooter from './components/ScripsFooter';

function App() {
  return (
    <div className="app">
      <ScripsHeader />
      <ScripsBody />
      <ScripsFooter />
    </div>
  );
}

export default App;
