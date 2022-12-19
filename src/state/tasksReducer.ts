import {TasksStateType} from "../components/Todolist";
import {v1} from "uuid";
import {addTodolistACType} from "./todolistsReducer";


const initial: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initial, action: GeneralACType) => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.newTaskTitle, isDone: false};
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.newTodoID]: []}
        }
        case "REMOVE-TASK": {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskID)}
        }
        case "CHANGE-CHECK-BOX": {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID ? {...el, isDone: action.payload.checkBoxValue} : el)}
        }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID ? {...el, title: action.payload.newEditedTitle} : el)}
        }
        default:
            return state
    }
}

type GeneralACType = addTaskACType | addTodolistACType | removeTaskACType | changeCheckBoxACType | changeTaskTitleACType
type addTaskACType = ReturnType<typeof addTaskAC>
type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeCheckBoxACType = ReturnType<typeof changeCheckBoxAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const addTaskAC = (newTaskTitle: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            newTaskTitle, todolistID
        }
    } as const
}
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {todolistID, taskID}
    } as const
}
export const changeCheckBoxAC = (checkBoxValue: boolean, todolistID: string, taskID: string) => {
    return {
        type: 'CHANGE-CHECK-BOX',
        payload: {
            checkBoxValue, todolistID, taskID
        }
    } as const
}
export const changeTaskTitleAC = (newEditedTitle: string, todolistID: string, taskID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            newEditedTitle, todolistID ,taskID
        }
    } as const
}