import React, { useContext, useState } from 'react'
import CartContext from '../../context/CartContext'
import { Box, Button, Heading,Input, Stack, Text  } from '@chakra-ui/react'
import { addDoc, collection } from 'firebase/firestore'
import {db} from '../../config/Firebase'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const Checkout = () => {
    const [ user, setUser ] = useState({
        nombre: '',
        telefono: '',
        email: '',
        repetirMail: ''
    })
    const [emailMatch, setEmailMatch] = useState(null)
    const [ formErrors, setFormErrors ] = useState({})

    const { cart, getTotal, clearCart } = useContext(CartContext)

    const updateUser = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value,
        }))
    }
    const validateEmail = () => {
        if(user.email === user.repetirMail) {
            setEmailMatch(true)
        }else{
            setEmailMatch(false)
        }
    }
    
    const validateForm = () => {

        const errors = {}
        if(!user.nombre) {
            errors.name = 'Campo requerido'
        }
        if(!user.telefono) {
            errors.telefono = 'Campo requerido'
        }
        if(!user.email) {
            errors.email = 'Campo requerido'
        }
        if(!user.repetirMail) {
            errors.repetirMail = 'Campo requerido'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const getOrder = () => {
        const isFormValid = validateForm()
        validateEmail()
        if(isFormValid && emailMatch){

            const order = {
                buyer: user,
                items: cart,
                total: getTotal()
            }
            const ordersCollection = collection(db, 'orders')
            
            addDoc(ordersCollection, order)
            .then(({id}) => {
                Swal.fire({
                    title: "SU COMPRA SE REALIZÓ CON ÉXITO",
                    text: `Orden De Compra Nº ${id}`,
                    icon: "success",
                    confirmButtonColor: "green",
                    confirmButtonText: "ACEPTAR"
                  });
            })
        }
    }

  return (
    <>
    <Box>
        <Heading>Resumen de compra:</Heading>
        <Heading>{getTotal()}</Heading>
    </Box>
    <form>
        <Stack spacing={3}>
            <Input 
                placeholder='Nombre' 
                size='lg'
                name='nombre' 
                onChange={updateUser}
                />
            <Input 
                placeholder='Telefono' 
                size='lg'
                name='telefono' 
                onChange={updateUser}
                />
            <Input 
                placeholder='email' 
                size='lg' 
                name='email'
                onChange={updateUser}
                />
            <Input 
                placeholder='Repetir mail' 
                size='lg' 
                name='repetirMail'
                onChange={updateUser}
                />
            <Button onClick={getOrder}>Comprar</Button>
            
        {formErrors.repetirMail && (
            <Text>{formErrors.repetirMail}</Text>
        )}
        {!emailMatch && (
            <Text>Los campos no coinciden</Text>
        )}
        </Stack>
    </form>
    </>
  )
}

export default Checkout