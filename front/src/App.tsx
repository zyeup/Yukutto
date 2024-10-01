import { ChangeEvent, FormEvent, useState } from 'react';
import './App.css'

function App() {

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo ={
    inputValue: string;
    id: number;
    checked: boolean;
  } 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  }

  const handleEdit = () => {

  }


  return (
    <>
      <div>
        <h2>
          Todoリスト with TypeScript
        </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input 
            type="text" 
            onChange={(e) => handleChange(e)} 
          />
          <input 
            type="submit" 
            value="作成"
          />
        </form>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input 
                type="text" 
                onChange={() => handleEdit()} 
                value={todo.inputValue}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
