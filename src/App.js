import logo from './logo.svg';
import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import TodoFeature from './features/Todo';
import AlbumFeature from './features/Album';
import NotFound from './components/NotFound';
import HomeFeature from './features/Home';
import ProductFeature from './features/ProductFeature';
import Member from './features/Member';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<HomeFeature />}/>
        <Route path='/todos/*' element={<TodoFeature />}/>
        <Route path='/albums/*' element={<AlbumFeature />}/>
        <Route path='/product/*' element={<ProductFeature />}/>
        <Route path='/member/*' element={<Member />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;