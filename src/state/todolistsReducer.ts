import {TodolistsStateType} from "../App";
import {v1} from "uuid";

const initial: TodolistsStateType[] = []

export const todolistsReducer = (state:TodolistsStateType[] = initial, action: GeneralACType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodo = {id: action.payload.newTodoID, title: action.payload.newTitle, filter: 'all'}
           return [newTodo, ...state]
        }
        default: return state
    }
}
type GeneralACType = addTodolistACType
export type addTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (newTitle: string, newTodoID: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle, newTodoID
        }
    } as const
}