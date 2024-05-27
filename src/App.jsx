import { useEffect, useState } from 'react';
import './App.css';
import { addTodo, removeTodo, updateTodo } from './features/todoSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({});
  
  const todos = useSelector((state) => state.todos); // Note: Adjusted to match initial state
  console.log("todos", todos);
  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    isEdit 
      ? dispatch(updateTodo({
          ...selectedRecord, 
          text: input
        }))
      : dispatch(addTodo(input));
    setInput('');   
    setIsEdit(false);
  };

  return (  
    <>
      <h1>ToDo</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <input 
              type="text" 
              name="todoText" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              id="todoText" 
              placeholder="Enter a todo" 
            />
            <button 
              type='submit' 
              className='btn btn-success'>
              {isEdit ? "Edit" : "Add"} Todo
            </button>
          </div>
        </form>
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id}>
              <p style={{color: "black"}}>{todo.text}</p>
              <button 
                type='button' 
                onClick={() => {
                  setSelectedRecord(todo); 
                  setIsEdit(true); 
                  setInput(todo.text);
                }} 
                className='btn btn-primary'>
                Edit
              </button>
              <button 
                type='button' 
                onClick={() => dispatch(removeTodo(todo.id))} 
                className='btn btn-danger'>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
