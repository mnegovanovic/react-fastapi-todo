import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
const axios = require('axios').default;

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
      <div
          className="todo"
          style={{ textDecoration: todo.is_complete ? "line-through" : "" }}
      >
          {todo.text}
          <div>
              <button onClick={() => completeTodo(index)}>Complete</button>
              <button onClick={() => removeTodo(index)}>x</button>
          </div>
      </div>
  );
};

function TodoForm({ addTodo }) {
    const [value, setValue] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

function ToDoApp() {
    const [todos, setTodos] = React.useState([]);

    React.useEffect(() => {
        syncTodos();
    }, []);

    const syncTodos = () => {
        axios.get('http://localhost:8000/todos')
            .then(function (response) {
                setTodos(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const addTodo = text => {
        //const newTodos = [...todos, { text }];
        //setTodos(newTodos);

        axios.post('http://localhost:8000/todos', {
            text: text,
            is_complete: false
        })
            .then(function (response) {
                syncTodos();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const completeTodo = index => {
        //const newTodos = [...todos];
        //newTodos[index].is_complete = true;
        //setTodos(newTodos);
        
        var todo = todos[index];
        axios.put('http://localhost:8000/todos/'+index, {
            text: todo.text,
            is_complete: !todo.is_complete
        })
            .then(function (response) {
                syncTodos();
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const removeTodo = index => {
        //const newTodos = [...todos];
        //newTodos.splice(index, 1);
        //setTodos(newTodos);
        
        axios.delete('http://localhost:8000/todos/'+index)
            .then(function (response) {
                syncTodos();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    
    return (
            <div className="app">
                <Layout />
                <div className="todo-list">
                {todos.map((todo, index) => (
                    <Todo
                        key={index}
                        index={index}
                        todo={todo}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                    />
                ))}
                <TodoForm addTodo={addTodo} />
                </div>
            </div>
    );
}

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/todo" element={<ToDoApp />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todo">ToDo App</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    );
}

function Contact() {
  return (
    <div>
        <Layout />
        <h2>Contact</h2>
    </div>
  );
}

export default App;
