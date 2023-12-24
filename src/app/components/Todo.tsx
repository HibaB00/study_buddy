"use client"

import { useState } from "react"
import { Todo } from "@/src/types/Todo";
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    const [todo, setTodo] = useState<string>('')
    const [todos, setTodos] = useState<Todo[]>([]);

    function addTodo(e: any) {
        e.preventDefault;
        setTodos([...todos, {title: todo.trim(), done: false}])
        setTodo('')
    }

    function handleDelete(index: number) {
        setTodos(todos.filter((_val, i) => i !== index))
    }

    function handleCheck(index: number) {
        const todo = todos[index]
        const updatedTodo = {...todo, done: !todo.done};
        const newTodos = [...todos];
        newTodos[index] = updatedTodo;
        setTodos(newTodos);
    }

    return (
        <Draggable>
            <div className="border-4 border-slate-400/100 bg-slate-50 w-96 flex flex-col p-9 rounded-lg gap-3">
                <form action={addTodo} className="flex gap-2">
                    <input className="rounded-md p-1 w-full" type="text" value={todo} onChange={(e) => setTodo(e.target.value)} aria-label="todo title" placeholder="Add Todo"/>
                    <button type="submit">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </form>

                <ul className="flex flex-col gap-2">
                    {todos.map((todo, index) => (
                        <div className="flex justify-between p-2 border-2 border-slate-400/50 rounded-md">
                            <li 
                            key={index} 
                            className={`flex gap-2 ${ todo.done ? 'line-through' : 'no-underline'}`}
                            >
                                <input type="checkbox" onClick={() => handleCheck(index)} checked={todo.done}/>
                                {todo.title}
                            </li>
                            <button onClick={() => handleDelete(index)}>
                                <FontAwesomeIcon icon={faTrash} style={{color: "#ed333b",}} />
                            </button>
                        </div>
                    ))}
                </ul>
            </div>    
        </Draggable>
    )
}