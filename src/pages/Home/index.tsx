import { useEffect, useState } from "react";
import CreateTask from "../../components/home/CreateTask"
import TaskList from "../../components/home/TaskList"
import DeleteTask from "../../components/home/DeleteTask"
import EditTask from "../../components/home/EditModal";

// Tạo interface để dễ dàng sử dụng cho useState
export interface IState {
  taskList: {
    id: string;
    taskName: string;
    priority: string;
    status: string;
    image: string;
  }[];

  inputData: {
    id: string;
    taskName: string;
    priority: string;
    status: string;
    image: string;
};

  priority: {
    high: boolean;
    medium: boolean;
    low: boolean
  }

}

function Home() {

  const [inputData, setInputData] = useState({id: '',taskName: "", priority: "", status: "To do", image: "src/picture/none-circle.png"});
  const [openEditTask, setOpenEditTaksk] = useState<boolean>(false)
  const [idTask, setIdTask] = useState<string>("")
  const [openCreateTask, setOpenCreateTask] = useState<boolean>(false);
  const [openDeleteTask, setOpenDeleteTask] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true)
  
  // Tạo local storage như thế này để không bị mắc lỗi khác giá trị khi sử dụng TS
  const savedList = localStorage.getItem("taskList");
  const parsedList = savedList ? JSON.parse(savedList) : null;
  const [taskList, setTaskList] = useState<IState["taskList"]>(
    (parsedList as IState["taskList"]) ?? []
  );
  useEffect(() => {
    localStorage?.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const [priority, setPriority] = useState<IState["priority"]>({
    high: false,
    medium: false,
    low: false,
  });



  useEffect(() => {
    if (inputData.taskName.trim() !== "" && inputData.priority !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    if (inputData.priority == "High") {
      setPriority({
        high: true,
        medium: false,
        low: false,
      });
    } else if (inputData.priority == "Medium") {
      setPriority({
        high: false,
        medium: true,
        low: false,
      });
    } else if (inputData.priority == "Low") {
      setPriority({
        high: false,
        medium: false,
        low: true,
      });
    } else {
      setPriority({
        high: false,
        medium: false,
        low: false,
      });
    }
  }, [inputData.priority, inputData.taskName]);
  return (
    <>

    {/* Task List */}
    <TaskList 
    taskList = {taskList}
    setTaskList = {setTaskList}
    setOpenCreateTask={setOpenCreateTask}
    openDeleteTask = {openDeleteTask}
    setOpenDeleteTask = {setOpenDeleteTask}
    idTask = {idTask}
    setIdTask = {setIdTask}
    setOpenEditTask = {setOpenEditTaksk}
    >
    </TaskList>
    
    {/* Create Task */}
    <CreateTask
       openCreateTask={openCreateTask}
       setOpenCreateTask={setOpenCreateTask}
       taskList={taskList}
       setTaskList={setTaskList}
       inputData={inputData}
       setInputData = {setInputData}
       disabled = {disabled}
       setDisabled = {setDisabled}
       priority = {priority}
    ></CreateTask>

    {/* Delete Task */}
    <DeleteTask
      taskList = {taskList}
      setTaskList = {setTaskList}
      setOpenDeleteTask = {setOpenDeleteTask}
      openDeleteTask = {openDeleteTask}
      idTask = {idTask}
      setIdTask = {setIdTask}
    ></DeleteTask>

    {/* Edit Task */}
    <EditTask
      taskList = {taskList}
      setTaskList = {setTaskList}
      openEditTask = {openEditTask}
      setOpenEditTask = {setOpenEditTaksk}
      idTask = {idTask}
      setIdTask = {setIdTask}
      inputData={inputData}
      setInputData = {setInputData}
      disabled = {disabled}
      setDisabled = {setDisabled}
      priority = {priority}
    >
    </EditTask>

    </>

  )
}

export default Home