import { useState, useEffect } from "react";
import api from "../api";
import Task from "../components/Task";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getTasks();
    }, [])
    
    const getTasks = () => {
        api
            .get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => { setTasks(data); console.log(data) })
            .catch((error) => alert(error));
    };

    const deleteTask = (id) => {
        api
            .delete(`/api/tasks/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Task deleted.");
                else alert("Failed to delete task.");
                getTasks();
            })
            .catch((error) => alert(error));
    };

    const createTask = (e) => {
        e.preventDefault();
        api
            .post("/api/tasks/", { title, "start_time": startTime, "end_time": endTime })
            .then((res) => {
                if (res.status === 201) alert("Task created.");
                else alert("Failed to create task.");
                getTasks();
            })
            .catch((error) => alert(error));
    };

    return (
        <>
            <h2>Tasks</h2>
            {tasks.map((task) => <Task task={task} onDelete={deleteTask} key={task.id} />)}
            <form onSubmit={createTask}>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    required 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <input 
                    type="datetime-local" 
                    id="startTime" 
                    name="startTime" 
                    required 
                    onChange={(e) => setStartTime(e.target.value)}
                    value={startTime}
                />
                <input 
                    type="datetime-local" 
                    id="endTime" 
                    name="endTime" 
                    required 
                    onChange={(e) => setEndTime(e.target.value)}
                    value={endTime}
                />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default Home;
