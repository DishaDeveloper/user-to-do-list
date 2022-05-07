import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function UserTodoList(props) {
  const [todoEdit, settodoEdit] = useState(false);
  const [todoNewName, settodoNewName] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wastodoEditing = usePrevious(todoEdit);

  function handleChange(e) {
    settodoNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!todoNewName.trim()) {
      return;
    }
    props.editTask(props.id, todoNewName);
    settodoNewName("");
    settodoEdit(false);
  }

  const editingTodoTemplate = (
    <form className="edit-todo-list-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          id={props.id}
          className="todo-text todo-input form-control"
          type="text"
          value={todoNewName || props.name}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="edit-todo-list-btn-container">
        <button type="submit" className="btn todo-btn todo-btn-edit">
          <i className="fas fa-save"></i>
        </button>
        <button
          type="button"
          className="btn todo-btn todo-btn-delete"
          onClick={() => settodoEdit(false)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </form>
  );

  const viewTodoTemplate = (
    <div className="edit-todo-list-container">
      <div className="edit-todo-list-wrapper">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="edit-todo-list-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="edit-todo-list-btn-container">
        {!props.completed && (
          <button
            type="button"
            className="btn todo-btn todo-btn-edit"
            onClick={() => settodoEdit(true)}
            ref={editButtonRef}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
        )}
        <button
          type="button"
          className="btn todo-btn todo-btn-delete"
          onClick={() => props.deleteTask(props.id)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wastodoEditing && todoEdit) {
      editFieldRef.current.focus();
    }
    if (wastodoEditing && !todoEdit) {
      editButtonRef.current.focus();
    }
  }, [wastodoEditing, todoEdit]);

  return (
    <li className="edit-todo-list">
      {todoEdit ? editingTodoTemplate : viewTodoTemplate}
    </li>
  );
}
