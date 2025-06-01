'use client';

import { X } from 'lucide-react';
import classes from './style.module.css'
import { useState } from 'react';

export const Todos = () => {

  const [todoList, setTodoList] = useState([])

  const [title, setTitle] = useState('')

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onCompleted = (todo) => {
    const todos = todoList.map(t => {
      if(t.id !== todo.id){
        return t
      }

      return {
        ...t,
        completed: !t.completed
      }
    })

    setTodoList(todos)
  }

  function addTodo() {

    if(!title){
      alert('Fill title input!')
      return
    }

    const newTodo = {
      id: Date.now(),
      title: title,
      completed: false
    }

    setTodoList(prev => [newTodo, ...prev])
    setTitle('')
  }

  const removeTodo = (todo) => {
   const filteredTodos = todoList.filter(t => t.id !== todo.id)
   setTodoList(filteredTodos)
  }


  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h2>Task list</h2>
      </div>
      <div className={classes.form}>
        <input
          type="text"
          placeholder='Title of todo...'
          onChange={onChangeTitle}
          value={title}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {
          todoList.map(todo => (
            <li className={classes.todo} key={todo.id}>
              <label className={`${classes.todoLabel} ${todo.completed ? classes.done : ''}`}>
                <input type="checkbox" checked={todo.completed} onChange={() => onCompleted(todo)} />
                <span>{todo.title}</span>
              </label>
              <button className={classes.removeBtn} onClick={() => removeTodo(todo)}>
                <X />
              </button>
            </li>
          ))
        }
      </ul>

    </div>
  )
}
