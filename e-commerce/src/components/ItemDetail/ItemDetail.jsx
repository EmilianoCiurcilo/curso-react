import React, { useContext, useState } from 'react'
import { Card, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, CardBody, CardFooter, Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import CartContext from '../../context/CartContext'
import ItemCount from '../ItemCount/ItemCount'
import productos from '../../data/productos'
const ItemDetail = ({categoria, descripcion, img, nombre, precio, cantidad, id}) => {
    const [quantity, setQuantity] = useState(0)
    const { addItem } = useContext(CartContext)

    const onAdd = (quantity) => {
        setQuantity(quantity)
        const newProduct = {
          id, nombre, precio
        }
        addItem(newProduct, quantity)
    }

  return (
    <Card maxW='sm' mt={10} >
      <CardBody>
        <Image
          src={img}
          alt={nombre}
          borderRadius='lg'
          boxSize='100%'
          objectFit='cover' 
          h='400px' 
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{nombre}</Heading>
          <Text color='gray' fontSize='2xl'>
            {descripcion}
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            ${precio}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
           {quantity > 0  ? <ChakraLink as={ReactRouterLink}  to={'/cart'} color='teal.500' fontSize={'1.5rem'}>ir al carrito</ChakraLink> :
        <ItemCount initialValue={1} stock={cantidad} onAdd={onAdd}/>
        }
      </CardFooter>
    </Card>
  )
}

export default ItemDetail