import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TodolistsStateType} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeCheckBoxAC, changeTaskTitleAC, removeTaskAC} from "../state/tasksReducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolistsReducer";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    todolist: TodolistsStateType
}
export type TasksStateType = {
    [key: string]: TasksType[]
}
export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

export const Todolist: React.FC<TodolistPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id])
    const dispatch = useDispatch()

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const addTask = (todolistID: string) => {
        if (newTaskTitle !== '') {
            dispatch(addTaskAC(newTaskTitle, todolistID))
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>, todolistID: string) => {
        if (event.key === 'Enter') {
            addTask(todolistID)
        }
    }
    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }
    const changeCheckBoxValue = (checkBoxValue: boolean, todolistID: string, taskID: string) => {
        dispatch(changeCheckBoxAC(checkBoxValue, todolistID, taskID))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }
    const changeFilter = (filterValue: FilterValueType) => {
        dispatch(changeFilterAC(filterValue, id))
    }
    const changeTaskTitle = (newEditedTitle:string, todolistID: string, taskID: string) => {
        dispatch(changeTaskTitleAC(newEditedTitle, todolistID, taskID))
    }
    const changeTodolistTitle = (newEditedTitle: string, todolistID: string) => {
        dispatch(changeTodolistTitleAC(newEditedTitle, todolistID))
    }

    if (filter === 'active') {
        tasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(el => el.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} callBack={(newEditedTitle) => changeTodolistTitle(newEditedTitle, id)}/>
                {/*{title}*/}
                <button onClick={() => removeTodolist(id)}>Del</button>
            </h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeInputHandler}
                       onKeyDown={(event) => onEnterHandler(event, id)}/>
                {error && <div>{error}</div>}
                <button onClick={() => addTask(id)}>+</button>
            </div>
            <ul>
                {tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}
                                   onChange={(event) => changeCheckBoxValue(event.currentTarget.checked, id, el.id)}/>
                            <EditableSpan title={el.title} callBack={(newEditedTitle:string) => changeTaskTitle(newEditedTitle, id, el.id)}/>
                            <button onClick={() => removeTask(id, el.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

