import {TasksStateType} from "../components/Todolist";
import {v1} from "uuid";


const initial:TasksStateType = {}

export const tasksReducer = (state:TasksStateType = initial, action: GeneralACType) => {
    switch (action.type) {
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.newTaskTitle, isDone: false};
            return {...state, [action.payload.todolistID]: [ newTask, ...state[action.payload.todolistID]]}
        }
        default: return state
    }
}
type GeneralACType = addTaskACPropsType
type addTaskACPropsType = ReturnType<typeof addTaskAC>

export const addTaskAC = (newTaskTitle: string, todolistID:string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            newTaskTitle, todolistID
        }
    } as const
}