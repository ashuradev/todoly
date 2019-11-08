import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import TodoList from './TodoList'
import TodoForm from './TodoForm'

class App extends React.Component {
    state = {
        todos: []
    }

    addTodo = todo => this.setState({
        todos: [...this.state.todos, todo]
    })

    render() {
        const { 
            addTodo,
            state: { todos } 
        } = this

        return (
            <Container maxWidth="sm">
                <Typography align="center" variant="h4">
                    Todoly
                </Typography>

                <TodoForm addTodo={addTodo} />
                
                <TodoList todos={todos} />
            </Container>
        )
    }
}

export default App