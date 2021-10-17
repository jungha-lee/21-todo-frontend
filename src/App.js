import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { call } from './service/ApiService';
import { Paper, List, Container } from '@material-ui/core';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }
    componentDidMount() {
        call('/todo', 'GET', null).then((response) =>
            this.setState({ items: response.data })
        );
    }

    add = (item) => {
        call('/todo', 'POST', item).then((response) =>
            this.setState({ items: response.data })
        );
    };

    delete = (item) => {
        call('/todo', 'DELETE', item).then((response) =>
            this.setState({ items: response.data })
        );
    };

    render() {
        let todoItems = this.state.items.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List>
                    {this.state.items.map((item, index) => (
                        <Todo item={item} key={item.id} delete={this.delete} />
                    ))}
                </List>
            </Paper>
        );
        return (
            <div className="App">
                <Container maxWidth="md">
                    <AddTodo add={this.add} />
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );
    }
}

export default App;
