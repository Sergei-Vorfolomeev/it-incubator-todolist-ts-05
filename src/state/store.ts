import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

//create store
export const store = legacy_createStore(rootReducer)

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// to call store in the browser console
//@ts-ignore
window.store = store