import styles from "./style.module.scss";
import { IState as Props } from "../../../pages/Home";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  taskList: Props["taskList"];
  setTaskList: React.Dispatch<React.SetStateAction<Props["taskList"]>>;
  openCreateTask: boolean;
  setOpenCreateTask: React.Dispatch<React.SetStateAction<boolean>>;
  inputData: Props["inputData"];
  setInputData: React.Dispatch<React.SetStateAction<Props["inputData"]>>;
  disabled: boolean
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  priority: Props["priority"]
}

function CreateTask({
  openCreateTask,
  setOpenCreateTask,
  setTaskList,
  taskList,
  inputData,
  setInputData,
  disabled,
  setDisabled,
  priority,
}: IProps) {

    //   const onChange = (
  //     e:
  //       | React.ChangeEvent<HTMLInputElement>
  //       | React.MouseEvent<HTMLButtonElement, MouseEvent>
  //       | ChangeEvent<HTMLInputElement>
  //   ) => {
  //     setInputData({
  //       ...inputData,
  //       [e.target.name]: e.target.value,
  //     });
  // console.log(e.target.innerHTML);

  //   };

  // const [priority, setPriority] = useState({
  //   high: false,
  //   medium: false,
  //   low: false,
  // });



  // useEffect(() => {
  //   if (inputData.taskName.trim() !== "" && inputData.priority !== "") {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //   }

  //   if (inputData.priority == "High") {
  //     setPriority({
  //       high: true,
  //       medium: false,
  //       low: false,
  //     });
  //   } else if (inputData.priority == "Medium") {
  //     setPriority({
  //       high: false,
  //       medium: true,
  //       low: false,
  //     });
  //   } else if (inputData.priority == "Low") {
  //     setPriority({
  //       high: false,
  //       medium: false,
  //       low: true,
  //     });
  //   } else {
  //     setPriority({
  //       high: false,
  //       medium: false,
  //       low: false,
  //     });
  //   }
  // }, [inputData.priority, inputData.taskName]);

  // Create task
  
  
  const handleSubmit = () => {
    setTaskList([
      ...taskList,
      {
        id: uuidv4(),
        taskName: inputData.taskName,
        priority: inputData.priority,
        status: inputData.status,
        image: inputData.image,
      },
    ]);
    setOpenCreateTask(false);
    setDisabled(true);
    setInputData({
      id: "",
      taskName: "",
      priority: "",
      status: "To do",
      image: "src/picture/none-circle.png",
    });
  };

  // Cancel add task
  const closeAddTask = () => {
    setOpenCreateTask(false);
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
      className={`${styles.container} ${
        openCreateTask == true ? styles.openCreateTask : ""
      }`}
    >
      <div className={styles.addTask}>
        {/* header */}
        <div className={styles.header}>
          <div className={styles.header__title}>Add Task</div>
          <div className={styles.header__button} onClick={closeAddTask}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        {/* task name */}
        <div className={styles.taskName}>
          <div className={styles.taskName__title}>Task</div>
          <input
            name="task"
            onChange={(e) => {
              setInputData({
                ...inputData,
                taskName: e.currentTarget.value,
              });
            }}
            type="text"
            placeholder="Task name"
            className={styles.taskName__input}
            value={inputData.taskName}
          />
        </div>

        {/* priority */}
        <div className={styles.priority}>
          <div className={styles.priority__title}>Priority</div>
          <div className={styles.priority__option}>

            {/* high */}
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

            {/* medium */}
            <button
              className={`${styles["priority__option--medium"]} ${
                priority.medium == true ? styles["priority__click--medium"] : ""
              }`}
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
            
            {/* low */}
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

        {/* button submit */}
        <div className={styles.submit}>
          {/* button add */}
          <button
            disabled={disabled}
            className={styles["submit__add"]}
            onClick={handleSubmit}
          >
            Add
          </button>
          {/* button cancel */}
          <button 
            className={styles["submit__cancel"]} 
            onClick={closeAddTask}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
