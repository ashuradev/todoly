import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import TodoList from './TodoList'
import TodoForm from './TodoForm'

import api from './../services/api'

class App extends React.Component {
    defaultState = {
        todos: [],
        search: ''
    }

    state = this.defaultState

    clearState = () => this.setState(this.defaultState)

    addTodo = todo => this.setState(state => ({
        todos: [todo, ...state.todos]
    }))

    setSearch = (search, callback = null) => this.setState(() => ({ search }), callback)

    getTodos = async () => {
        const { 
            data: {
                meta,
                data
            }
        } = await api.get(`/todos?search=${this.state.search}`)

        this.setState(state => ({
            todos: [...data, ...state.todos]
        }))

        return data
    }

    editTodo = todo => this.setState(({ todos }) => ({ 
        todos: todos.map(
            filteredTodo => filteredTodo.id === todo.id ? todo : filteredTodo
        )
    }))

    deleteTodo = todo => this.setState(state => ({
        todos: state.todos.filter(filteredTodo => filteredTodo.id !== todo.id)
    }))
    
    search = query => {
        this.clearState()
        this.setSearch(query, this.getTodos)
    }

    componentDidMount = this.getTodos

    render() {
        const { 
            addTodo,
            deleteTodo,
            search,   
            editTodo,
            state: { 
                todos 
            } 
        } = this

        return (
            <Container maxWidth="md">
                <Typography 
                    align="center" 
                    variant="h4" 
                >
                    Todoly
                </Typography>

                <TodoForm 
                    addTodo={addTodo} 
                    search={search} 
                />
                
                <TodoList 
                    todos={todos} 
                    editTodo={editTodo} 
                    deleteTodo={deleteTodo} 
                />
            </Container>
        )
    }
}

export default App