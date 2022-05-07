import React from "react";

function TodoFilterButton(props) {
  return (
    <button
      type="button"
      className="btn todo-btn todo-filter-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span>{props.name}</span>
    </button>
  );
}

export default TodoFilterButton;
