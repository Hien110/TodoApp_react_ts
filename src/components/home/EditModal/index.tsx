import styles from "./style.module.scss";
import { IState as Props } from "../../../pages/Home";
interface IProps {
  taskList: Props["taskList"];
  setTaskList: React.Dispatch<React.SetStateAction<Props["taskList"]>>;
  openEditTask: boolean;
  setOpenEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  idTask: string;
  setIdTask: React.Dispatch<React.SetStateAction<string>>;
  inputData: Props["inputData"];
  setInputData: React.Dispatch<React.SetStateAction<Props["inputData"]>>;
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  priority: Props["priority"];
}

function EditTask({
  taskList,
  setTaskList,
  openEditTask,
  setOpenEditTask,
  idTask,
  inputData,
  setInputData,
  disabled,
  setDisabled,
  priority,
}: IProps) {
  //   const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
  //     setInputData({...inputData, [e.target.name]: e.target.value, id: idTask}  )
  // }

  // const [priority, setPriority] = useState({
  //   high: false,
  //   medium: false,
  //   low: false
  // })

  // // const [disabled, setDisable] = useState(true)

  // useEffect(()=>{
  //   if (inputData.taskName.trim() !== "" && inputData.priority !== ""){
  //     setDisabled(false)
  //   } else {
  //     setDisabled(true)
  //   }
  //   if (inputData.priority == 'High'){
  //     setPriority({
  //       high: true,
  //       medium: false,
  //       low: false
  //     })
  //   } else if(inputData.priority == "Medium"){
  //     setPriority({
  //       high: false,
  //       medium: true,
  //       low: false
  //     })
  //   } else if (inputData.priority == "Low") {
  //     setPriority({
  //       high: false,
  //       medium: false,
  //       low: true
  //     })
  //   } else {
  //     setPriority({
  //       high: false,
  //       medium: false,
  //       low: false
  //     })
  //   }
  // }, [inputData.priority, inputData.taskName])
  // Edit Task
  const handleEdit = () => {
    const newTaskList = taskList.map((task) => {
      if (idTask == task.id) {
        return inputData;
      } else {
        return task;
      }
    });
    setTaskList(newTaskList);
    setOpenEditTask(false);
    setDisabled(true);
    setInputData({
      id: "",
      taskName: "",
      priority: "",
      status: "To do",
      image: "src/picture/none-circle.png",
    });
  };

  // cancel Edit Task
  const closeEditTask = () => {
    setOpenEditTask(false);
    setDisabled(true);
    setInputData({
      id: "",
      taskName: "",
      priority: "",
      status: "To do",
      image: "src/picture/none-circle.png",
    });
  };

  
  return (
    <div
      className={`${styles.container}  ${
        openEditTask == true ? styles.openEditTask : ""
      }`}
    >
      <div className={styles.editTask}>

        {/* header */}
        <div className={styles.header}>
          <div className={styles.header__title}>Edit Task</div>
          <div className={styles.header__button} onClick={closeEditTask}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        {/* task name */}
        <div className={styles.taskName}>
          <div className={styles.taskName__title}>Task</div>
          <input
            name="task"
            type="text"
            placeholder="Task name"
            className={styles.taskName__input}
            onChange={(e) => {
              setInputData({
                ...inputData,
                taskName: e.currentTarget.value,
                id: idTask,
              });
            }}
            value={inputData.taskName}
          />
        </div>

        {/* priority */}
        <div className={styles.priority}>
          <div className={styles.priority__title}>Priority</div>
          <div className={styles.priority__option}>
            <button
              className={`${styles["priority__option--high"]} ${
                priority.high == true ? styles["priority__click--high"] : ""
              }`}
              value={"High"}
              name="priority"
              onClick={(e) => {
                setInputData({
                  ...inputData,
                  priority: e.currentTarget.value,
                });
              }}
            >
              High
            </button>
            <button
              className={`${styles["priority__option--medium"]} ${
                priority.medium == true ? styles["priority__click--medium"] : ""
              } `}
              value={"Medium"}
              name="priority"
              onClick={(e) => {
                setInputData({
                  ...inputData,
                  priority: e.currentTarget.value,
                });
              }}
            >
              Medium
            </button>
            <button
              className={`${styles["priority__option--low"]} ${
                priority.low == true ? styles["priority__click--low"] : ""
              }`}
              value={"Low"}
              name="priority"
              onClick={(e) => {
                setInputData({
                  ...inputData,
                  priority: e.currentTarget.value,
                });
              }}
            >
              Low
            </button>
          </div>
        </div>

        {/* submit */}
        <div className={styles.submit}>

          {/* edit button */}
          <button
            disabled={disabled}
            className={styles["submit__add"]}
            onClick={handleEdit}
          >
            Edit
          </button>

          {/* cancel button */}
          <button className={styles["submit__cancel"]} onClick={closeEditTask}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
