import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { call, signout } from './service/ApiService';
import {
    Paper,
    List,
    Container,
    Grid,
    Button,
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
        };
    }
    componentDidMount() {
        call('/todo', 'GET', null).then((response) =>
            this.setState({ items: response.data, loading: false })
        );
    }

    add = (item) => {
        call('/todo', 'POST', item).then((response) =>
            this.setState({ items: response.data })
        );
    };

    update = (item) => {
        call('/todo', 'PUT', item).then((response) =>
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
                        <Todo
                            item={item}
                            key={item.id}
                            update={this.update}
                            delete={this.delete}
                        />
                    ))}
                </List>
            </Paper>
        );

        var navigationBar = (
            <AppBar position="static">
                <Toolbar>
                    <Grid justify="space-between" container>
                        <Grid item>
                            <Typography variant="h6">Today's todo</Typography>
                        </Grid>
                        <Grid>
                            <Button color="inherit" onClick={signout}>
                                Log out
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );

        let todoListPage = (
            <div>
                {navigationBar}
                <Container maxWidth="md">
                    <AddTodo add={this.add} />
                    <div className="TodoList">{todoItems}</div>
                </Container>
            </div>
        );
        let loadingPage = <h1> Loading... </h1>;

        let content = loadingPage;
        if (!this.state.loading) {
            content = todoListPage;
        }

        return <div className="App">{content}</div>;
    }
}

export default App;
