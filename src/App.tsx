import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {InputComponent} from "./components/InputComponent";
import {addTodolistAC} from "./state/todolistsReducer";
import {v1} from "uuid";

export type TodolistsStateType = {
    id: string
    title: string
    filter: string
}

function App() {

    let todolists = useSelector<AppRootStateType, TodolistsStateType[]>(state => state.todolists)
    const dispatch = useDispatch()

    const addTodolist = (newTitle: string) => {
        const newTodoID = v1()
        dispatch(addTodolistAC(newTitle, newTodoID))
    }

    return (
        <div className="App">
            <InputComponent callBack={addTodolist}/>

            {todolists.map(el => {
                return (
                    <Todolist key={el.id}
                              todolist={el}/>
                )
            })}
        </div>
    );
}

export default App;
