/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      toEdit: '',
      editVal: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delItem = this.delItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.setEditInput = this.setEditInput.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  setEditInput(e) {
    this.setState((state) => ({
      ...state,
      editVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  delItem(id) {
    const filteredTodos = this.state.todos.filter((todo) => todo !== id);
    this.setState((state) => ({
      ...state,
      todos: filteredTodos,
    }));
  }

  editItem(todo) {
    this.setState((state) => ({
      ...state,
      toEdit: todo,
    }));
  }

  doneEdit(toEditTodo) {
    const index = this.state.todos.indexOf(toEditTodo);
    this.state.todos[index] = this.state.editVal;

    this.setState((state) => ({
      ...state,
      todos: this.state.todos,
      toEdit: '',
      editVal: '',
    }));
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <div>
              {this.state.toEdit === todo ? (
                <div key={todo}>
                  <input
                    type="text"
                    value={this.state.editVal}
                    onChange={(e) => this.setEditInput(e)}
                  />
                  <button type="button" onClick={() => this.doneEdit(todo)}>
                    Done
                  </button>
                </div>
              ) : (
                <div key={todo}>
                  <li key={todo}>{todo}</li>
                  <button type="button" onClick={() => this.delItem(todo)}>
                    del
                  </button>
                  <button type="button" onClick={() => this.editItem(todo)}>
                    edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </ul>
        <p>Number of todos: {this.state.todos.length}</p>
      </section>
    );
  }
}

export default ClassInput;
