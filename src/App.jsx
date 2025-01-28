import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // theme
import 'primereact/resources/primereact.min.css'; // core styles
import 'primeicons/primeicons.css'; // icons
import { confirmDialog } from 'primereact/confirmdialog';

 
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [isconfirming, setIsconfirming] = useState(false);
  const [tasktoDelete, setTasktoDelete] = useState(null)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
    let todos= JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)

  }
  }, [])

  const saveTLS = (params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const HandleEdit = (e,id) => {
    let t=todos.filter(i=>i.id=== id)
    setTodo(t[0].todo)
    let newTodos= todos.filter(item=> {
      return item.id!=id;
    });
    setTodos(newTodos);
    saveTLS();  
  }

  const HandleDelete = (e, id) => {
    setTasktoDelete(id);
    setIsconfirming(true);
  };

  const onConfirmDelete = () => {
  let newTodos = todos.filter((item) => item.id !== tasktoDelete);
  setTodos(newTodos);
  saveTLS();
  setIsconfirming(false);
  setTasktoDelete(null);
  
  }

  const oncanceldelete = () => {
    setIsconfirming(false);
    setTasktoDelete(null);
  }

  const HandleAdd = () => {
    if (todo.trim() === '') {
      alert("please enter a task!");
      return;
    }
    else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo('')
      saveTLS()
    };
  }

  const handlechange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    console.log(index)
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    setTodos(newtodos)
    saveTLS()
  }
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-pink-200 min-h-screen">
        <div className='AddTodo'>
          <h2 className='text-lg font-bold my-5'> Add a Todo</h2>
          <input onChange={handlechange} onKeyDown={(e) => e.key === 'Enter' && HandleAdd()} value={todo} type='text' className='w-1/2' />
          <button onClick={HandleAdd} className='border-2 border-slate-900 bg-slate-800 text-white px-2 hover:bg-slate-950 rounded-md mx-6'>Save</button>
          <h1 className='text-lg font-bold'> Your Todo</h1>
          <div className="todos">
            {todos.length === 0 && <div className='m-5'> No todos to Display!</div>}
            {todos.map(item => {
              return <div key={item.id} className='todo flex justify-between w-1/3 my-3'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}
                </div>
                <div className="buttons">
                  <button onClick={(e)=>HandleEdit(e,item.id)} className='border-2 border-slate-900 bg-slate-800 text-white px-2 hover:bg-slate-950 rounded-md mx-6'>Edit</button>
                  <button onClick={(e) => { HandleDelete(e, item.id) }} className='border-2 border-slate-900 bg-slate-800 text-white px-2 hover:bg-slate-950 rounded-md mx-6'>Delete</button>
                </div>
              </div>
            })}
          </div>
        </div>

        {isconfirming && (
          <div className='confirmation-prompt bg-gray-200 p-4 rounded-md'>
            <p>are you sure you want to delete this?</p>
            <button onClick={onConfirmDelete} className='border-2 border-red-500 bg-red-600 text-white px-2 rounded-md mx-2'> Yes</button>
            <button onClick={oncanceldelete}
            className='border-2 border-green-500 bg-green-600 text-white px-2 rounded-md mx-2'
            >No</button>
            </div>
        )}
      </div>
    </>
  );
}

export default App