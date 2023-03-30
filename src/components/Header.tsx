import { Navbar, Container } from 'react-bootstrap';
import './Header.css';

function Header() {
  return (
    <Navbar bg="brand-dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Business Search</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
