import React, { Component } from "react";

import List from "./List";
import Input from "./Input";
import Title from "./Title";
import Footer from "./Footer";
import { VisibilityFilters } from "./constants";

import { connect } from "react-redux";
import { actionCreators } from "./TodoListRedux";

const mapStateToProps = state => ({
  todos: state.todos,
  visibilityFilter: state.visibilityFilter
});

const API_URL = "https://5de5cb269c4220001405b029.mockapi.io/api/todos";

class App extends Component {
  fetchTodos = () => {
    return dispatch => {
      dispatch(actionCreators.fetchTodosPending());
      fetch(API_URL)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            throw res.error;
          }
          dispatch(actionCreators.fetchTodosSuccess(res));
          return res.json();
        })
        .catch(error => {
          dispatch(actionCreators.fetchTodosError(error));
        });
    };
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(this.fetchTodos());
  }

  onAddTodo = text => {
    const { dispatch } = this.props;
    fetch(API_URL, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ text, completed: false })
    })
      .then(res => res.json())
      .then(result => {
        console.log("result from add: ", result);
        dispatch(actionCreators.add(result));
      })
      .catch(err => console.error("Request failed", err));
  };

  onToggleTodo = todo => {
    todo.completed = !todo.completed;
    const { dispatch } = this.props;
    fetch(API_URL + "/" + todo.id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
      .then(result => {
        dispatch(actionCreators.update(result));
      })
      .catch(err => console.error("Request failed", err));
  };

  onUpdateVisibilityFilter = visibility => {
    const { dispatch } = this.props;
    dispatch(actionCreators.setVisibilityFilter(visibility));
  };

  onDeleteTodo = id => {
    const { dispatch } = this.props;
    fetch(API_URL + "/" + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        console.log("deleted:", result);
        dispatch(actionCreators.remove(result.id));
      })
      .catch(err => console.error("Request failed", err));
  };

  render() {
    const { todos, visibilityFilter } = this.props;

    let visibleTodos = todos;
    if (visibilityFilter === VisibilityFilters.SHOW_ACTIVE) {
      visibleTodos = todos.filter(todo => !todo.completed);
    } else if (visibilityFilter === VisibilityFilters.SHOW_COMPLETED) {
      visibleTodos = todos.filter(todo => todo.completed);
    }

    return (
      <div style={styles.container}>
        <Title>To-Do List</Title>
        <Input
          placeholder={"Type a todo, then hit enter!"}
          onSubmitEditing={this.onAddTodo}
        />
        <List
          list={visibleTodos}
          onToggleTodo={this.onToggleTodo}
          onDeleteTodo={this.onDeleteTodo}
        />
        <Footer
          currentFilter={this.props.visibilityFilter}
          onUpdateVisibilityFilter={this.onUpdateVisibilityFilter}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  }
};

export default connect(mapStateToProps)(App);