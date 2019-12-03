import React, { Component } from "react";

import List from "./List";
import Input from "./Input";
import Title from "./Title";
import {VisibilityFilters} from "./constants";
import Footer from "./Footer";

export default class App extends Component {
  key = 0;
  state = {
    todos: [
      {text: "Click to remove", id: this.key++, completed: false},
      {text: "Learn React", id: this.key++, completed: false},
      {text: "Write Code", id: this.key++, completed: false},
      {text: "Ship App", id: this.key++, completed: false}
      ],
      visibilityFilter: VisibilityFilters.SHOW_ALL
  };

  onAddTodo = text => {
    const { todos } = this.state;

    this.setState({
      ...this.state,
      todos: [{text, id: this.key++, completed: false}, ...todos]
    });
  };

  onToggleTodo = index => {
    const {todos} = this.state;
    this.setState({
      todos: todos.map((todo, i) => {
        if(todo.id === index) {
          return {...todo, completed: !todo.completed};
        } else {
          return todo;
        }
      })
    });
  }

  onUpdateVisibilityFilter = visibility => {
    this.setState({
      ...this.state,
      visibilityFilter: visibility
    });
  };

  onDeleteTodo = index => {
    const { todos } = this.state;

    this.setState({
      ...this.state,
      todos: todos.filter(todo => todo.id !== index)
    });
  };

  render() {
    const { todos, visibilityFilter } = this.state;

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
          currentFilter = {this.state.visibilityFilter}
          onUpdateVisibilityFilter = {this.onUpdateVisibilityFilter}
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
