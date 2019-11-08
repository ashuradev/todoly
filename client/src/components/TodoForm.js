import React, { useState } from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

import api from './../services/api'

const TodoForm = ({ addTodo }) => {
    const [description, setDescription] = useState('')

    const handleChange = event => setDescription(event.target.value)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const { data: { data } } = await api.post('/todos', { description })

            addTodo(data)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth={true}>
                <InputLabel>Descrição</InputLabel>
                <Input onChange={handleChange} />
            </FormControl>

            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                style={{ marginTop: 15 }} 
                fullWidth={true}
            >
                Adicionar todo
            </Button>
        </form>
    )
}

export default TodoForm