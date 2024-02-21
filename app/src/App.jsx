import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';

import './App.css'

function App() {
  //Crear los estados para trabajar las tareas
  //Estado para almacenar la lista de tareas: 
  const [tasks, setTasks] = useState([]);
  //Estado para almacenar aquella tarea que se esta escribiendo en nuestra caja interactiva => input
  const [currentTasks, setCurrentTasks] = useState('');
  //Estado almacenar el termino de busqueda de dicha tarea
  const [search, setSearch] = useState('');


  //Funcion que va a manejar el cambio en dicho input => input de la tarea 
  const inputChange = (event) => {
    setCurrentTasks(event.target.value)
  };

  //Funcion para agregar tareas a la lista de tareas
  const addTask = () => {
    //Verificar primero que la tarea no este vacia 
    if (currentTasks.trim() !== '') {
      //crea un objeto de la tarea con un identificador y el nombre de dicha tarea 
      const newTask = {
        id: Date.now(), //generamos el id
        name: currentTasks // Asignamos el nombre de la tarea actual 
      };

      //copia de las tareas actuales y agregamos luego la nuevca tarea al final de la lista
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);

      //Restablecer el valor del input a una cadena vacía 
      setCurrentTasks('')
    }
  };

  //Funcion para filtrar segun el termino 
  const searchTasks = () => {
    //Crear una filtracion 
    return tasks.filter(task => task.name.toLowerCase().startsWith(search.toLowerCase()))
  }

  //funcion que pueda eliminar las tareas 
  const deleteTask = (taskId) => {
    //utilizar un metodo filter para crear un nuevo array que excluye la tarea
    const tasksDelete = tasks.filter(task => task.id !== taskId);

    //Actualizar el estado de tasks con el nuevo array que excluye las tareas eliminadas
    setTasks(tasksDelete)

  }
  return (
    <>
      <div className="todo-list-container">


        {/* 1- seccion para agregar nuevas tareas */}
        <div className="input-container">
          <input type="text" value={currentTasks} onChange={inputChange} placeholder='Ingrese una tarea' />
          {/*Input el cual va a agregar las tareas */}
          <button onClick={addTask}>Agregar</button>
        </div>


        {/* 2-Lista de tareas  */}
        <ul>
          {tasks.map((task) => (
            <li key={task.id}> {/*invocando cada ID de las tareas*/}
              <div className="taks-item">
                <p className='task-text'>{task.name}</p>

                <FontAwesomeIcon className='fa-trash' icon={faTrash} onClick={()=> deleteTask(task.id)} />
              </div>
            </li>
          ))}
        </ul>


        {/* 3-Seccion para buscar tareas */}
        <div className="search-container">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder='Buscar tarea' />

          <FontAwesomeIcon className='fa-search' icon={faSearch} />

        </div>

        <ul>
          {search && searchTasks().map((task) => (
            <li key={task.id}>
              <div className="taks-item">
                <p className='task-text'>{task.name}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* 4- Lista de tareas filtradas por el termino de busqueda */}
      </div>
    </>
  )
}

export default App
