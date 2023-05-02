"use client"
import { ITask } from '@/types/tasks'
import { FormEventHandler, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Modal from './Modal'
import { useRouter } from 'next/navigation'
import { deleteTodo, editTodo } from '@/api'

//interface from ITask 
interface TaskProps {
    task: ITask
}



const Tasks: React.FC<TaskProps> = ({ task }) => {
  //rounter to refresh the page after a task is added
  const router = useRouter()
  //usestates to add, delete and edit the tasks
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text)

  // handle submit for edit button 
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> =  async (e) => {
    e.preventDefault()
    await editTodo({
      id: task.id,
      text: taskToEdit
    })
   
    setOpenModalEdit(false)
    router.refresh()
  }

 // handle delete for edit button 
  const handleDeleteTask =  async (id: string) => {
      await deleteTodo(id)
      setOpenModalDelete(false)
      router.refresh()
  }

  return (
   
    <tr key={task.id}>
        <td className='w-full'>{task.text}</td>
        <td className='flex gap-5'>
          {/* created a onclick event inside component to edit tasks */}
          <FiEdit onClick={() => setOpenModalEdit(true)}  cursor='pointer' className='text-blue-500' size={25} />
          {/* used modal for daisyui to handle edits */}
          <Modal modalOpen={openModalEdit}  setModalOpen={setOpenModalEdit} >
             <form  onSubmit={handleSubmitEditTodo}>
              <h3 className='font-bold text-lg'>Edit task</h3>
              <div className='modal-action '>
              <input 
              value={taskToEdit}
              onChange={e => setTaskToEdit(e.target.value)}
              type="text" 
              placeholder="Type here" 
              className="input input-bordered w-full " 
              />
              <button type='submit' className='btn'>Submit</button>
              </div>
             </form>
            </Modal>
            
          {/* created a onclick event inside component to delete tasks*/}
          <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor='pointer' className='text-red-500' size={25} />
          <Modal modalOpen={openModalDelete}  setModalOpen={setOpenModalDelete} >
              <h3 className='text-lg'>Are you sure, you want to delete this task?</h3>
              <div className='modal-action'>
                <button onClick={() => handleDeleteTask(task.id)} className='btn'>Yes</button>
              </div>
            </Modal>
          </td>
    </tr>

  )
}

export default Tasks