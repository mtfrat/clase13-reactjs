import ItemList from "./ItemList"
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getFirestore } from "../../services/getFirestore"

const ItemListContainer = () => {

    const [productos, setProductos] = useState([])
    const [loading,setLoading] = useState(true)
    const {categoria} = useParams()

    useEffect(() =>{

        // Hago la conexion con firestore
        const db = getFirestore()

        // Compruebo si categoria tiene algun valor
        const dbQuery = categoria ?
                            db.collection('items').where('categoria','==',categoria)
                        :
                            db.colection('items')

        // Recibe la conexión item de firebase y me trae todo lo que filtramos anteriormente
        dbQuery.get()
        .then(dataDb => setProductos(dataDb.docs.map(pro => ({id:pro.id, ...pro.data()}))))
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false))

    },[categoria]) //Agrego dependencia que detecte el cambio y dispare el useEffect

    return (
        <>
            {loading ?
                    <h2>Cargando...</h2>
                :
                <div>
                    <h1 className="mt-5">{categoria} disponibles</h1>
                    <div style={{ display: 'flex',flexDirection:'row'}}>
                        <ItemList items = {productos}/>
                    </div>
                </div>
            }
        </>
    )
}

export default ItemListContainer