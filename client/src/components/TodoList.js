import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

import api from './../services/api'

const TodoList = ({
    todos,
    deleteTodo,
    editTodo
}) => {
    const [open, setOpen] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState({})
    const [description, setDescription] = useState('')

    const handleTodoDelete = async (todo) => {
        await api.delete(`/todos/${todo.id}`)

        deleteTodo(todo)
    }

    const handleTodoEditRequest = todo => {
        setSelectedTodo(todo)
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    const handleChange = event => setDescription(event.target.value)

    const handleTodoSave = async () => {
        try {
            await api.put(`/todos/${selectedTodo.id}`, { description })

            editTodo({
                description,
                id: selectedTodo.id
            })

            handleClose()
        } catch (error) {
            alert('Erro: ' + error.message)
        }
    }

    return (
        <>
            <List>
                {todos.map(todo => (
                    <ListItem key={todo.id} disableGutters={true}>
                        <ListItemText>
                            {todo.description}
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => handleTodoDelete(todo)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => handleTodoEditRequest(todo)}>
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Editar todo
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Descrição"
                        fullWidth
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleTodoSave} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>

            
        </>
    )
}

export default TodoList