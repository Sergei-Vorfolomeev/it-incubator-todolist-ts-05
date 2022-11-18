import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksType} from "../App";
import {Button} from "./Button";
import {Input} from "./Input";

type TodolistPropsType = {
    id: number
    title: string
    tasks: TasksType[]
    removeTask: (todolistID: number, taskID: string) => void
    addTask: (todolistID: number, newTitle: string) => void
    changeFilter: (todolistID: number, filterValue: FilterValueType) => void
    changeCheckBox: (todolistID: number, taskID: string, checkBoxValue: boolean) => void
    removeTodolist: (todolistID: number) => void
    newTitle: string
    setNewTitle: (newTitle:string) => void
    error: string | null
    setError: (error:string | null) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {


    const removeTaskHandler = (taskID: string) => {
        props.removeTask(props.id, taskID)
    }
    const addTaskHandler = () => {
        if (props.newTitle !== '') {
            props.addTask(props.id, props.newTitle.trim())
            props.setNewTitle('')
        } else {
            props.setError('Title is required')
        }
    }

    const changeFilterHandler = (filterValue: FilterValueType) => {
        props.changeFilter(props.id, filterValue)
    }
    const onChangeCheckBoxHandler = (taskID: string, checkBoxValue: boolean) => {
        props.changeCheckBox(props.id, taskID, checkBoxValue)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3>
                {props.title}
                <Button name={'Del'}
                        callBack={removeTodolistHandler}/>
            </h3>
            <div>
                <Input newTitle={props.newTitle}
                       setNewTitle={props.setNewTitle}
                       error={props.error}
                       setError={props.setError}
                       callBack={addTaskHandler}/>
                <Button name={'+'}
                        callBack={addTaskHandler}/>
            </div>
            {props.error && <div>{props.error}</div>}
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.taskId}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={(event) => onChangeCheckBoxHandler(el.taskId, event.currentTarget.checked)}
                            />
                            <span>{el.title}</span>
                            <Button name={'X'}
                                    callBack={() => removeTaskHandler(el.taskId)}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button name={'All'} callBack={() => changeFilterHandler('all')}/>
                <Button name={'Active'} callBack={() => changeFilterHandler('active')}/>
                <Button name={'Completed'} callBack={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    );
};

