import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [updatingTodo, setUpdatingTodo] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedBody, setUpdatedBody] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

                // FETCH()


    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:3000/todos');
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async () => {
        if (newTodo.trim() !== '') {
            try {
                const response = await fetch('http://localhost:3000/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: newTodo, body: '' }),
                });
                const data = await response.json();
                setTodos([...todos, data]);
                setNewTodo('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };


                // END FETCH()


                        //AXIOS


    const updateTodo = async (todo) => {
        try {
            await axios.patch(`http://localhost:3000/todos/${todo.id}`, {
                title: updatedTitle,
                body: updatedBody,
            });
            setUpdatingTodo(null);
            setUpdatedTitle('');
            setUpdatedBody('');
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (todo) => {
        try {
            await axios.delete(`http://localhost:3000/todos/${todo.id}`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

                    // END AXIOS

    return (
        <div className="todo-list-container">
            <h1 className="todo-list-title">Todo List</h1>
            <div className="todo-input-container">
                <input
                    type="text"
                    placeholder="New Todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="todo-input"
                />
                <button onClick={addTodo} className="todo-add-button">
                    Add
                </button>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        {updatingTodo === todo.id ? (
                            <div className="todo-update-container">
                                <input
                                    type="text"
                                    value={updatedTitle}
                                    onChange={(e) => setUpdatedTitle(e.target.value)}
                                    className="todo-update-title"
                                />
                                <textarea
                                    value={updatedBody}
                                    onChange={(e) => setUpdatedBody(e.target.value)}
                                    className="todo-update-body"
                                ></textarea>
                                <button onClick={() => updateTodo(todo)} className="todo-update-button">
                                    Update
                                </button>
                                <button onClick={() => deleteTodo(todo)} className="todo-delete-button">
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <div className="todo-details">
                                <h3 className="todo-title">{todo.title}</h3>
                                <p className="todo-body">{todo.body}</p>
                                <div className="todo-actions">
                                    <button onClick={() => setUpdatingTodo(todo.id)} className="todo-update-button">
                                        Update
                                    </button>
                                    <button onClick={() => deleteTodo(todo)} className="todo-delete-button">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;