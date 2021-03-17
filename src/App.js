import './scss/index.scss';
import './css/App.css';
import ScripsHeader from './components/Header/ScripsHeader';
import ScripsBody from './components/Body/ScripsBody';
import ScripsFooter from './components/Footer/ScripsFooter';

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
