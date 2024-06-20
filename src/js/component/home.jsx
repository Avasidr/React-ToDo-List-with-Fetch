import React, {useEffect, useState} from "react";

//include images into your bundle




//create your first component
const Home = () => {
	const [inputTask, setInputTask] = useState("")
	const [task, setTask] = useState([]);
	useEffect(() => {fetch("https://playground.4geeks.com/apis/fake/todos/user/AvasidrTaskManager")
	.then(response => response.json())
	.then(response => setTask(response))}, [])
	
	const newTask = () => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/AvasidrTaskManager", {
			method: "PUT",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json",
			  }
		})
	}
	useEffect(() => {
		newTask()
	}, [task])
	const addNewTask = (e) => {
		if (e.key === "Enter"){
			setTask([...task, {label: inputTask, done: false}]);
			setInputTask("")
		}
	}
	const handleDelete = (index) => {
		setTask(task.filter((label, i)=> i !== index))
		};

	const checkTask = (index) => {
		const newTask = [...task]
		newTask[index].done = !newTask[index].done
		setTask(newTask)
	}

	return (
		<div className="container">
			<h1>My Tasks List</h1>
			<ul>
				<li>
					<input 
					type="text" 
					placeholder="New task" 
					onChange={(e) => setInputTask(e.target.value)}
					value={inputTask}
					onKeyDown={addNewTask}
					>
					</input>
				</li>
				{task.map((tarea, index) => (
					<li key={index}>
						<span className={tarea.done ? "check" : ""} onClick={() => checkTask(index)}>{tarea.label}</span>
						<i className="fas fa-times icon" onClick={() => handleDelete(index)} id="notChecked"></i>
					</li>
				))}
			</ul>
			<div className="counter">{task.length} tasks</div>
		</div>
	);
};

export default Home;
