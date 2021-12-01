import { Nav } from "react-bootstrap"
import { Navbar } from "react-bootstrap"
import { Container } from "react-bootstrap"
import CartWidget from "../CartWidget/CartWidget"
import { Link } from "react-router-dom"

const NavBar = () => {

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home"><Link to='/'>Athor</Link></Navbar.Brand>
                <Nav className="justify-content-right">
                    <Link to='/'>Inicio</Link>
                    <Link to='/vehiculos/autos'>Autos</Link>
                    <Link to='/vehiculos/camionetas'>Camionetas</Link>
                    <Nav.Link href="#">Nosotros</Nav.Link>
                    <Nav.Link href="#">Contacto</Nav.Link>
                    <CartWidget />
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar