import styles from './style.module.scss';
import { IState as Props} from "../../../pages/Home";

// tạo một interface để get props và kiểu dữ liệu từ cha
interface IProps {
  taskList: Props['taskList']
  setTaskList: React.Dispatch<React.SetStateAction<Props['taskList']>>
  setOpenCreateTask: React.Dispatch<React.SetStateAction<boolean>>
  openDeleteTask: boolean;
  setOpenDeleteTask : React.Dispatch<React.SetStateAction<boolean>>
  idTask: string
  setIdTask:  React.Dispatch<React.SetStateAction<string>>
  setOpenEditTask: React.Dispatch<React.SetStateAction<boolean>>
}

function TaskList({taskList, setTaskList, setOpenCreateTask, setOpenDeleteTask,setIdTask, setOpenEditTask}: IProps ) {
  
  // dùng để mở delete modal và lấy id của task muốn xoá
  const deleteTask = (index:number) => {
    setOpenDeleteTask(true)
    setIdTask(taskList[taskList.length - index -1].id)
  }
  
  // dùng để mở edit modal và lấy id của task muốn chỉnh sửa
  const editTask = (index:number) => {
    setOpenEditTask(true)
    setIdTask(taskList[taskList.length - index -1].id)
  }
  
  // thay đổi status khi click vào button
  const changStatus = (index:number) => {
    // Tạo một bản sao mới của taskList để tránh thay đổi trực tiếp state
    const updatedTaskList = [...taskList];
    // taskList.length - index -1 nhằm mục đích lấy đúng thứ tự của task sau khi bị đảo ngược
    switch (taskList[taskList.length - index -1].status) {
      case 'To do':
        updatedTaskList[taskList.length - index -1].status = 'In Progress';
        updatedTaskList[taskList.length - index -1].image = 'src/picture/half-circle.png'
        break;
      case 'In Progress':
        updatedTaskList[taskList.length - index -1].status = 'Done';
        updatedTaskList[taskList.length - index -1].image = 'src/picture/full-circle.png'
        break;
      case 'Done':
        updatedTaskList[taskList.length - index -1].status = 'To do';
        updatedTaskList[taskList.length - index -1].image = 'src/picture/none-circle.png'
        break;
      default:
        break;
    }
    setTaskList(updatedTaskList)
  };

  
  return (
    <div className={styles.screen}>
      {/* content */}
      <div className={styles["taskList"]}>
        {/* header */}
        <div className={styles.header}>
          <h1 className={styles.header__title}>Task List</h1>
          <button className= {styles.header__button} onClick={()=>setOpenCreateTask(true)}>
            <i className={`fa-solid fa-plus ${styles['header__button--icon']}`}></i>
            <span>Add Task</span>
          </button>
        </div>
        {/* body */}
        {/* reverse() dùng để đảo mảng và đưa task mới thêm vào lên đầu tiên */}
        {[...taskList].reverse().map((task, index) => (
          <div key={task.id} className={styles.body}>

            {/* task name */}
            <div className={styles["body__task"]}>
              <div className={styles['body__task--title']}>Task</div>
              <div className={styles["body__task--content"]}>{task.taskName}</div>
            </div>

            {/* priority */}
            <div className={styles["body__priority"]}>
              <div className={styles["body__priority--title"]}>Priority</div>
              <div className={`${styles["body__priority--content"]} ${styles[task.priority.toLowerCase()]}`}>{task.priority}</div>
            </div>

            {/* status */}
            <button onClick={()=>changStatus(index)} className={styles["body__status"]}>
              <div>{task.status}</div>
            </button>
            <div className={styles["body__icon"]}>
              <img src={task.image} alt="" />
            </div>

            <div>
            {/* button edit */}
            <button className={styles["body__edit"]} onClick={()=>editTask(index)}>
              <i className="fa-regular fa-pen-to-square "></i>
            </button>

            {/* button delete */}
            <button className={styles["body__delete"]} onClick={()=>deleteTask(index)}>
              <i className="fa-regular fa-trash-can "></i>
            </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
