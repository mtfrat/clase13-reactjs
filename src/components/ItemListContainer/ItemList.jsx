import Item from "./Item"

const ItemList = ({items}) => {

    //Listo los items

    return (
        <>
            {
            items.map(producto =>  <Item key={producto.id} producto={producto}/>)
            }
        </>
    )
}

export default ItemList
