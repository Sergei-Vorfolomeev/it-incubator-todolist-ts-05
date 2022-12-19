import {TodolistsStateType} from "../App";
import {v1} from "uuid";
import {FilterValueType} from "../components/Todolist";

const initial: TodolistsStateType[] = []

export const todolistsReducer = (state:TodolistsStateType[] = initial, action: GeneralACType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodo = {id: action.payload.newTodoID, title: action.payload.newTitle, filter: 'all'}
           return [newTodo, ...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case "CHANGE-FILTER": {
            return state.map(el => el.id === action.payload.todolistID ? {...el, filter: action.payload.filterValue} : el)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newEditedTitle} : el)
        }
        default: return state
    }
}
type GeneralACType = addTodolistACType | removeTodolistACType | changeFilterAC | changeTodolistTitleACType
export type addTodolistACType = ReturnType<typeof addTodolistAC>
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type changeFilterAC = ReturnType<typeof changeFilterAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const addTodolistAC = (newTitle: string, newTodoID: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle, newTodoID
        }
    } as const
}
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}
export const changeFilterAC = (filterValue: FilterValueType, todolistID: string) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            filterValue, todolistID
        }
    } as const
}
export const changeTodolistTitleAC = (newEditedTitle: string, todolistID: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            newEditedTitle, todolistID
        }
    } as const
}