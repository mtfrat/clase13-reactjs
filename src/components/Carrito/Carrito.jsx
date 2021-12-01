import { Card} from "react-bootstrap";
import {useCartContext} from "../../context/CartContext.jsx"
import Button from "@restart/ui/esm/Button"
import { Link } from "react-router-dom"
import { getFirestore } from "../../services/getFirestore"

export const Carrito = () => {

    const {cartList, borrarCarrito, sumarTotal, eliminarUnidad} = useCartContext()

    // Genero orden

    const generarOrden = (e) =>{
        e.preventDefault()
        const orden = {}

        orden.buyer = {nombre: 'javier', mail: 'javiarp@hotmail.com', telefono: '42342900'}
        orden.total = sumarTotal()
        orden.items = cartList.map(item => {
            const id = item.id
            const marca = item.marca
            const modelo = item.modelo
            const precio = item.precio * item.cantidad
            return{id, marca, modelo, precio}
        })
        

        const dbQuery = getFirestore()
        dbQuery.collection('orders').add(orden)
        .then(resp=>console.log(resp))
        .catch(err=>console.log(err))

    }

    return (
        <>
        {
            cartList !== undefined &&
                cartList.length === 0?
                <div>
                    <h1>Carrito vacio</h1>
                    <Link to='/vehiculos/autos'>
                        <Button className="btn btn-dark" variant="primary">
                            Volver a tienda
                        </Button>
                    </Link>                      
                </div>
                    
                :
                    <>
                        <h1>Productos en el carrito:</h1>
                        {cartList.map((prod) => <Card key={prod.id} style={{
                                width: '30rem',
                                display:'block',
                                marginTop:'100px',
                                marginRight:'auto',
                                marginBottom:'0px',
                                marginLeft:'auto'}}>
                                <Card.Img variant="top" src={prod.imagen} />
                                <Card.Body>
                                    <Card.Title>{prod.marca} {prod.modelo}</Card.Title>
                                    <Card.Text>
                                        Año: {prod.año}
                                    </Card.Text>
                                    <Card.Text>
                                        Precio: {prod.precio}
                                    </Card.Text>
                                    <Card.Text>
                                        Cantidad: {prod.cantidad}
                                    </Card.Text>
                                </Card.Body>
                                <Button onClick={()=>eliminarUnidad(prod.id)}className="btn btn-dark" variant="primary">
                                    <i class="fas fa-trash"></i>
                                </Button>
                            </Card>)
                        }
                        <div>Total: {sumarTotal()}</div>
                        <button onClick={borrarCarrito} className="btn btn-dark" variant="primary">
                            Vaciar carrito
                        </button>
                        <form onSubmit={generarOrden}>
                            <button className="btn btn-dark" variant="primary">
                                Finalizar compra
                            </button>
                        </form>
                    </>
        }        
        </>
    )
}
