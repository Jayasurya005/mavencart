import { BrowserRouter as Router, Route } from 'react-router-dom';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <Router>
      <div className='App'>
        <AllRoutes />
      </div>
    </Router>
  );
}

export default App;
