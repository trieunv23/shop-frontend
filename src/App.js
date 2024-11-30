import './App.css';
import Routes from './routes';
import LoginModal from './components/LoginModal';

import useAuthCheck from './hooks/useAuthCheck';
import useCartCount from './hooks/useCartCount';

const App = () => {
  useAuthCheck();
  useCartCount();

  return (
    <div className="App">
      <LoginModal />
      <Routes />
    </div>
  );
}

export default App;