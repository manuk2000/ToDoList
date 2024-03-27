import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesTytpe} from "../App";

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTasks: (id: string) => void,
    changeFiler: (type: FilterValuesTytpe) => void,
    addTask: (title: string) => void,
    changeDoneFieldTask: (id: string) => void,
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,

}

function ToDo(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onNewTaskAddKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
    }
    const onAllClick = () => props.changeFiler("all");
    const onCompletedClick = () => props.changeFiler("completed");
    const onActiveClick = () => props.changeFiler("active");
    const onChangeDoneKeyPressHandler = (id: string) => props.changeDoneFieldTask(id)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onKeyUp={onNewTaskAddKeyPressHandler}
                       onChange={onNewTitleChangeHandler}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {props.tasks.map((t: TaskType) => {
                    const removeTask = (id: string) => {
                        props.removeTasks(id)
                    }
                    return <li>
                        <input type="checkbox"
                               checked={t.isDone}
                               onKeyUp={() => onChangeDoneKeyPressHandler(t.id)}
                        />
                        <span>{t.title}</span>
                        <button onClick={() => removeTask(t.id)}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={onAllClick}>all</button>
                <button onClick={onCompletedClick}>completed</button>
                <button onClick={onActiveClick}>active</button>
            </div>
        </div>
    )
}

export default ToDo;















