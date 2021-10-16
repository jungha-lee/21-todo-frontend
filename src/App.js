import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container } from '@material-ui/core';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
    }
    add = (item) => {
        const thisItems = this.state.items;
        item.id = 'ID-' + thisItems.length;
        item.done = false;
        thisItems.push(item);
        this.setState({ items: thisItems });
        console.log('items : ', this.state.items);
    };

    delete = (item) => {
        const thisItems = this.state.items;
        console.log('Before update items : ', this.state.items);
        const newItems = thisItems.filter((e) => e.id !== item.id);
        this.setState({ items: newItems }, () => {
            console.log('Update items : ', this.state.items);
        });
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
