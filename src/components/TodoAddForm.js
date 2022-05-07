import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

function TodoAddForm(props) {
  const [taskName, settaskName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!taskName.trim()) {
      return;
    }
    props.addtodoTask(taskName);
    settaskName("");
  }

  function handleChange(e) {
    settaskName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo-list-container">
      <h2 className="add-todo-label">
        <label htmlFor="add-todo-input">What needs to be done?</label>
      </h2>

      <div>
        <FormControl
          type="text"
          id="add-todo-input"
          className="todo-input add-todo-input"
          name="text"
          autoComplete="off"
          value={taskName}
          onChange={handleChange}
          placeholder="Enter To do"
        />
        <button
          type="submit"
          variant="outline-secondary"
          className="btn d-block todo-btn todo-add-btn"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoAddForm;
