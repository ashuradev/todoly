import React, { useState, useEffect } from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import api from './../services/api'

const FormButton = ({ children, onClick }) => (
    <Button
        variant="contained" 
        color="primary"
        style={{ paddingLeft: 25, paddingRight: 25 }}
        onClick={onClick}>
        {children}
    </Button>
)

const TodoForm = ({ addTodo, search }) => {
    const [description, setDescription] = useState('')
    const [searching, setSearching] = useState(false)

    const handleChange = event => setDescription(event.target.value)

    const handleTodoAdd = async () => {
        try {
            const { 
                data: { 
                    data 
                } 
            } = await api.post('/todos', { description })

            addTodo(data)
        } catch (error) {
            alert('Erro: ' + error.message)
        }
    }

    const handleTodoSearch = () => {
        search(description)
        setSearching(true)
    }

    const back = () => {
        search('')
        setSearching(false)
    }

    return (
        <form>
            <FormControl fullWidth={true}>
                <InputLabel>Insira aqui a descrição do todo para adicionar ou pesquisar</InputLabel>
                <Input onChange={handleChange} />
            </FormControl>

            <Box display="flex" justifyContent="space-between" style={{ margin: '15px auto' }}>
                <FormButton onClick={handleTodoAdd}>
                    Adicionar
                </FormButton>

                <FormButton onClick={handleTodoSearch}>
                    Buscar
                </FormButton>

                {searching && (
                    <FormButton onClick={back}>
                        Voltar ao início
                    </FormButton>
                )}
            </Box>
        </form>
    )
}

export default TodoForm