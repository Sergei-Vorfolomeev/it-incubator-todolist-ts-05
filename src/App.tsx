import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {Input} from "./components/Input";

export type FilterValueType = 'all' | 'active' | 'completed'
type ObjectType = {
    title: string
    filter: FilterValueType
    tasks: TasksType[]
    students: Array<string>
}
export type TasksType = {
    taskId: string
    title: string
    isDone: boolean
}

function App() {
    const [todo, setTodo] = useState<Array<ObjectType>>([
        {
            title: "What to learn",
            filter: "all",
            tasks: [
                {taskId: v1(), title: "HTML&CSS", isDone: true},
                {taskId: v1(), title: "JS", isDone: false},
                {taskId: v1(), title: "React", isDone: false},
                {taskId: v1(), title: "Typescript", isDone: true},
                {taskId: v1(), title: "Angular", isDone: false},
            ],
            students: [
                'Rick Kane',
                'Finnlay Bentley',
                'Samia North',
                'Isaac Morton',
            ]
        },
        {
            title: "What to do",
            filter: "all",
            tasks: [
                {taskId: v1(), title: "Sport", isDone: true},
                {taskId: v1(), title: "Music", isDone: true},
                {taskId: v1(), title: "Dance", isDone: false},
                {taskId: v1(), title: "DJ", isDone: false},
                {taskId: v1(), title: "Study", isDone: false},
            ],
            students: [
                'Jago Wormald1',
                'Saul Milne2',
                'Aariz Hester3',
            ]
        }
    ]);
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const removeTask = (todolistID:number, taskID: string) => {
        setTodo(todo.map((el,index) => todolistID === index ? {...el, tasks:el.tasks.filter(t => t.taskId !== taskID)} : el))
    }
    const addTask = (todolistID:number, newTitle:string) => {
        const newTask = {taskId: v1(), title: newTitle, isDone: false}
        setTodo(todo.map((el, index) => todolistID === index ? {...el, tasks: [newTask, ...el.tasks]} : el ))
    }
    const changeFilter = (todolistID:number, filterValue: FilterValueType) => {
        setTodo(todo.map((el, index) => todolistID === index ? {...el, filter: filterValue} : el))
    }
    const changeCheckBox = (todolistID:number, taskID: string, checkBoxValue: boolean) => {
        setTodo(todo.map((el, index) => todolistID === index ? {...el, tasks: el.tasks.map(t => t.taskId === taskID ? {...t, isDone: checkBoxValue} : t)} : el))
    }
    const removeTodolist = (todolistID:number) => {
        setTodo(todo.filter((el, index) => index !== todolistID))
    }
    const addTodolistHandler = () => {
        addTodolist(newTitle)
    }
    const addTodolist = (newTitle:string) => {
        if (newTitle !== '') {
            const newTodoID = v1()
            const newTodo:ObjectType = {title: newTitle, filter: 'all', tasks: [], students: [],}
            setTodo([newTodo, ...todo])
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    console.log(newTitle)
    return (
        <div className="App">
            <Input newTitle={newTitle}
                   setNewTitle={setNewTitle}
                   error={error}
                   setError={setError}
                   callBack={addTodolistHandler}/>
            {todo.map((el, index) => {
                let tasksForTodolist = el.tasks
                if (el.filter === 'active') {
                    tasksForTodolist = el.tasks.filter(t => !t.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = el.tasks.filter(t => t.isDone)
                }
                return(
                    <Todolist
                        key={index}
                        id={index}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeCheckBox={changeCheckBox}
                        removeTodolist={removeTodolist}
                        newTitle={newTitle}
                        setNewTitle={setNewTitle}
                        error={error}
                        setError={setError}
                    />
                )
            })}

        </div>
    );
}

export default App;
