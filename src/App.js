import React from 'react';
import Todo from './Todo';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 0, title: 'Hello World 1', done: true },
                { id: 1, title: 'Hello World 2', done: false },
            ],
        };
    }
    render() {
        let todoItems = this.state.items.map((item, index) => (
            <Todo item={item} key={index} />
        ));
        return <div className="App">{todoItems}</div>;
    }
}

export default App;
