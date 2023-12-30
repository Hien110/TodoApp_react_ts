import React from 'react'
import styles from "./style.module.scss"
import { IState as Props} from "../../../pages/Home";
interface IProps {
  taskList: Props["taskList"];
  setTaskList: React.Dispatch<React.SetStateAction<Props["taskList"]>>;
  openDeleteTask: boolean
  setOpenDeleteTask : React.Dispatch<React.SetStateAction<boolean>>
  idTask: string
  setIdTask:  React.Dispatch<React.SetStateAction<string>>
}
function DeleteTask({taskList, setTaskList, openDeleteTask,  setOpenDeleteTask, idTask}: IProps ) {

  // delete task
  const handleDelete = () : void => {
      const newTaskList = taskList.filter((task) => task.id !== idTask);
      setTaskList(newTaskList)
      setOpenDeleteTask(false)
  }

  // cancel
  const handleCancel = () => {
    setOpenDeleteTask(false)
  }

  return (
    <div className={`${styles.container} ${openDeleteTask == true ? styles.openDeleteTask : ""}`}>
      <div className={styles.deleteTask}>
        <div className={styles.deleteTask__title}>Are you sure you want to delete this task?</div>
        <div className={styles.deleteTask__button}>
          <button className={styles['deleteTask__button--delete']} onClick={handleDelete}>Delete</button>
          <button className={styles['deleteTask__button--cancel']} onClick={handleCancel}>Cancle</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteTask