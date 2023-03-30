import { Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import PlaceDetails from './pages/PlaceDetails';
import Places from './pages/Places';

function App() {
  return (
    <Router>
      <Container className="my-5 w-75 mx-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Places />} />
          <Route path="/:id" element={<PlaceDetails />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
