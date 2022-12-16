import {TodolistsStateType} from "../App";
import {v1} from "uuid";

const initial: TodolistsStateType[] = []

export const todolistsReducer = (state:TodolistsStateType[] = initial, action: GeneralACType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newID = v1()
            const newTodo = {id: newID, title: action.payload.newTitle, filter: 'all'}
           return [newTodo, ...state]
        }
        default: return state
    }
}
type GeneralACType = addTodolistACType
type addTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle
        }
    } as const
}