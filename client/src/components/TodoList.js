import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import DeleteIcon from '@material-ui/icons/Delete'

const TodoList = ({
    todos
}) => (
    <List>
        {todos.reverse().map(todo => (
            <ListItem key={todo.id} disableGutters={true}>
                <ListItemText>
                    {todo.description}
                </ListItemText>
                <ListItemIcon>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </ListItemIcon>
            </ListItem>
        ))}
    </List>
)

export default TodoList