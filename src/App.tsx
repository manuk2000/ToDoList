import React, {useState} from 'react';
import './App.css';
import ToDo, {TaskType} from "./components/ToDo";
import {v1} from "uuid";

export type FilterValuesTytpe = "all" | "completed" | "active"

function App() {
    const [tasks, setTasks]
        = useState<Array<TaskType>>([
        {id: v1(), title: "title1", isDone: true},
        {id: v1(), title: "title2", isDone: true},
        {id: v1(), title: "title3", isDone: false},
    ])
    const [filterTasks, setFilterTasks]
        = useState<FilterValuesTytpe>("all");

    function addTask(title: string) {
        let task: TaskType = {id: v1(), title, isDone: false}
        setTasks([task, ...tasks])
    }

    function changeFiler(type: FilterValuesTytpe) {
        setFilterTasks(type);
    }

    function removeTasks(id: string) {
        let filter = tasks.filter((t) => t.id !== id);
        setTasks(filter);
    }

    function changeDoneFieldTask(id: string) {
        let tasksCopy = [...tasks];
        tasksCopy.map((i) => {
            if (i.id === id) {
                i.isDone = !i.isDone;
            }
        })
        setTasks(tasksCopy)
    }

    let tasksForToDoList = tasks;
    if (filterTasks === "completed") {
        tasksForToDoList = tasks
            .filter((t) => t.isDone);
    }
    if (filterTasks === "active") {
        tasksForToDoList = tasks
            .filter((t) => !t.isDone);
    }

    return (
        <div className="App">
            <ToDo
                title={"title1"}
                tasks={tasksForToDoList}
                removeTasks={removeTasks}
                changeFiler={changeFiler}
                addTask={addTask}
                changeDoneFieldTask={changeDoneFieldTask}
            />
            {/*<ToDo title={"title1"} tasks={tasks2}/>*/}
        </div>
    );
}


export default App;
