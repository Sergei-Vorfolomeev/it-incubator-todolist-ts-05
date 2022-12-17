import React, {ChangeEvent, useState} from 'react';
import {TodolistsStateType} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC} from "../state/tasksReducer";

type TodolistPropsType = {
    todolist: TodolistsStateType
}
export type TasksStateType = {
    [key:string]: TasksType[]
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist: React.FC<TodolistPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist

    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id])
    const dispatch = useDispatch()

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const addTask = (todolistID: string) => {
        dispatch(addTaskAC(newTaskTitle, todolistID))
    }
    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeInputHandler}/>
                <button onClick={() => addTask(id)}>+</button>
            </div>
            <ul>
                {tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

