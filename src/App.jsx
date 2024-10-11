import { Container, Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer.jsx'
import Bookings from './pages/Bookings.jsx'
import BookRoom from './pages/BookRoom.jsx'
import Home from './pages/Home.jsx'

export function Layout() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand as={Link} to={'/'}><img src="/src/assets/TropikaBrand.png" alt="Tropika Logo" width="200px" height="200px" /></Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to={'/'}>
              <div className='styled-header'>
                <i className="bi bi-house"></i><p>Home</p>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to={'/bookings'}>
              <div className='styled-header'>
                <i className="bi bi-calendar4-week"></i><p>Bookings</p>
              </div>
            </Nav.Link>
            <Nav.Link as={Link} to={'/bookroom'} >
              <div className='styled-header'>
                <i className="bi bi-calendar-plus"></i><p>Book a room</p>
              </div>
            </Nav.Link>
            {/* <Nav.Link as={Link} to={'/bookroom'} >
              <div className='styled-header'>
                <i className="bi bi-person-circle"></i><p>Account</p>
              </div>
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='bookroom' element={<BookRoom />} />
            {/* <Route path='login' element={<AuthPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
