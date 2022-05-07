import React, { useState, useRef } from "react";
import TodoAddForm from "./components/TodoAddForm";
import TodoFilterButton from "./components/TodoFilterButton";
import UserTodoList from "./components/UserTodoList";
import { nanoid } from "nanoid";
import { ListGroup } from "react-bootstrap";

const ToDoContainer = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const TODO_FILTER_NAMES = Object.keys(ToDoContainer);

function App(props) {
  const [todoTasks, settodoTasks] = useState(props.tasks);
  const [todofilter, settodoFilter] = useState("All");
  const todoListHeadingRef = useRef(null);

  function toggletodoTaskCompleted(id) {
    const todoupdated = todoTasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    settodoTasks(todoupdated);
  }

  function deletetodoTask(id) {
    const remainingTasks = todoTasks.filter((task) => id !== task.id);
    settodoTasks(remainingTasks);
  }

  function edittodoTask(id, newName) {
    const editedTaskList = todoTasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    settodoTasks(editedTaskList);
  }

  function addtodoTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    settodoTasks([...todoTasks, newTask]);
  }

  const todoTaskList = todoTasks
    .filter(ToDoContainer[todofilter])
    .map((task) => (
      <UserTodoList
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggletodoTaskCompleted}
        deleteTask={deletetodoTask}
        editTask={edittodoTask}
      />
    ));

  const todoFilterList = TODO_FILTER_NAMES.map((name) => (
    <TodoFilterButton
      key={name}
      name={name}
      isPressed={name === todofilter}
      setFilter={settodoFilter}
    />
  ));

  const tasksNoun = todoTaskList.length !== 1 ? "tasks" : "task";
  const todoHeadingText = `${todoTaskList.length} ${tasksNoun}`;

  return (
    <div className="todo-list-container stack-large">
      <label className="add-todo-title">To do</label>
      <TodoAddForm addtodoTask={addtodoTask} />
      <div className="todo-list-result">
        <div className="filters todo-btn">{todoFilterList}</div>
        <h2
          id="list-heading"
          className="todo-list-result-text"
          tabIndex="-1"
          ref={todoListHeadingRef}
        >
          {todoHeadingText}
        </h2>
        <ListGroup className="todo-list-wrapper" as="ul">
          {todoTaskList}
        </ListGroup>
      </div>
    </div>
  );
}

export default App;
