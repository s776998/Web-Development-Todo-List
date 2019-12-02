import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";

export default class List extends Component {
  renderItem = (item, i) => {
    const { onToggleTodo } = this.props;

    return (
      <div style={styles.item}>
        <Checkbox 
          checked = {item.completed}
          onChange = {() => onToggleTodo(item.id)}
        />
        {item.text}
      </div>
    );
  };

  render() {
    const { list } = this.props;

    return <div style={styles.container}>{list.map(this.renderItem)}</div>;
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  item: {
    backgroundColor: "whitesmoke",
    marginBottom: 5,
    padding: 15
  }
};
