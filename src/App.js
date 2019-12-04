import React, { Component } from "react";

import List from "./List";
import Input from "./Input";
import Title from "./Title";
import Footer from "./Footer";
import { VisibilityFilters } from "./constants";

import { connect } from "react-redux";
import { actionCreators } from "./TodoListRedux";
import { todosRef } from "./firebase";

const mapStateToProps = state => ({
  todos: state.todos,
  visibilityFilter: state.visibilityFilter
});

class App extends Component {
  fetchTodos = () => async dispatch => {
    dispatch(actionCreators.fetchTodosPending());
    todosRef.on("value", snapshot => {
      let todos = snapshot.val();
      console.log("snapshot:");
      console.log(todos);
      let newTodos = [];
      for (let key in todos) {
        newTodos.push({
          id: key,
          text: todos[key].text,
          completed: todos[key].completed
        });
      }
      console.log("newTodos:");
      console.log(newTodos);
      dispatch(actionCreators.fetchTodosSuccess(newTodos));
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(this.fetchTodos());
  }

  onAddTodo = text => {
    const { dispatch } = this.props;
    dispatch(actionCreators.add({ text, completed: false }));
  };

  onToggleTodo = todo => {
    todo.completed = !todo.completed;
    const { dispatch } = this.props;
    dispatch(actionCreators.update(todo));
  };

  onUpdateVisibilityFilter = visibility => {
    const { dispatch } = this.props;
    dispatch(actionCreators.setVisibilityFilter(visibility));
  };

  onDeleteTodo = id => {
    const { dispatch } = this.props;
    dispatch(actionCreators.remove(id));
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
