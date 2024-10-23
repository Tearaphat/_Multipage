import './Todo.css'
import { fecthTodos } from '../../../data/Todos';
import { useEffect, useState , useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

function Todo() {
    //STAGE
    //todos raw
    const [todosRaw, setTodosRaw] = useState([])

    //Todos-filter
    const [OnlyWaiting, setOnlyWaiting] = useState(false)
    const [itemPerPage, setItemPerPage] = useState(10)
    //Todos-list
    const [todos, setTodos] = useState([])
    //To-dos-display
    const [numPage, setNumPage] = useState()
    const [curPage, setCurPage] = useState(1)



    //useEffect
    useEffect(() => {
        // setCurPage((prev => prev > numPage ? numPage : prev))
        setCurPage(1)
    }, [numPage])


    useEffect(() => {
        console.log(`itemPerPage : ${itemPerPage}`)
        setNumPage(Math.ceil(todosRaw.length / itemPerPage))
    }, [itemPerPage, todosRaw])


    useEffect(() => {
        console.log(`onlyWaiting: ${OnlyWaiting}`)
    }, [OnlyWaiting])

    useEffect(() => {
        setTodosRaw(fecthTodos());
    }, [])

    useEffect(() => {
        if (OnlyWaiting) {
            setTodos(todosRaw.filter((todo) => !todo.completed)) //show waiting only and onlyWaiting = true 
        } else {
            setTodos(todosRaw) //show all
        }

    }, [todosRaw, OnlyWaiting, itemPerPage])


    //event handlers
    function deleteClick(id) {
        const todosRemain = todosRaw.filter((todo) => {
            return todo.id !== id
        })
        setTodosRaw(todosRemain)
    }

    function waitingClick(id) {
        const todoSelected = todosRaw.find((todo) => {
            return todo.id === id;
        })
        todoSelected.completed = true
        setTodosRaw([...todosRaw])
    }

    function addClick(id, title) {
        const newItem ={
            id,
            title,
            completed: false,
            userId: 1,
        }
        setTodosRaw([...todosRaw,newItem])

    }

    //modal handlers
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const newIdRef = useRef()
    const newTitleRef = useRef()

    return (
        <div className='todo-container'>
            {/* modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> <span className='bi bi-plus-lg'>&nbsp;ADD</span> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                style={{ textAlign: 'left' }}
                                disabled
                                value={
                                    Number(todosRaw.reduce((prev, todo) => {
                                        return todo.id > prev ? todo.id : prev
                                    }, 0)) + 1}
                                ref={newIdRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                style={{ textAlign: 'left' }}
                                ref={newTitleRef}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <span className='bi bi-x-lg'>&nbsp;Cancel</span>
                    </Button>
                    <Button variant="primary" onClick={() => {
                        const id = newIdRef.current.value
                        const title = newTitleRef.current.value.trim()
                        if(title === ''){
                            alert('Title cannot be empty')
                            newTitleRef.current.focus()
                        }else{
                            addClick(id, title)
                            handleClose()
                        }
                    }}>
                        <span className='bi bi-plus-lg'>&nbsp;Add</span>
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* filter */}
            <div className='todo-filters-container'>
                <div className="form-check form-switch" style={{ display: 'flex', alignItems: 'center' }}>
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" style={{ marginLeft: '0', height: '23px' }} onClick={(e) => { setOnlyWaiting(e.target.checked) }} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked" style={{ marginLeft: '10px' }}>
                        Show Only &nbsp;
                        <button className='btn btn-warning'>
                            Waiting &nbsp;
                            <span className='bi bi-clock'></span>
                        </button>
                    </label>
                </div>
                <select className="form-select" aria-label="Default select example" defaultValue={10} style={{ width: '200px' }} onChange={(e) => { setItemPerPage(e.target.value) }}>
                    <option value={5}>5 item per page</option>
                    <option value={10} selected>10 item per page</option>
                    <option value={50}>50 item per page</option>
                    <option value={100}>100 item per page</option>
                </select>
            </div>
            {/* table */}
            <table className='table table-striped'>
                <thead className='table-dark'>
                    <tr>
                        <th style={{ textAlign: 'center', width: '10%' }}>ID</th>
                        <th style={{ textAlign: 'center' }}>TITLE</th>
                        <th style={{ textAlign: 'right' }}>Completed&nbsp;<button className='btn btn-primary' onClick={() => { handleShow() }}><span className="bi bi-plus-lg"></span></button></th>
                    </tr>
                </thead>
                <tbody>

                    {todos.filter((todo, index) => {
                        const min = (curPage - 1) * itemPerPage;
                        const max = curPage * itemPerPage - 1
                        return index >= min && index <= max
                    }).map((todo) => {
                        return (
                            <tr key={todo.id}>
                                <td><span className='badge bg-secondary' style={{ width: '3rem' }}>{todo.id}</span></td>
                                <td style={{ textAlign: 'left' }}>{todo.title}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <button className={'btn ' + (todo.completed ? 'btn-success' : 'btn-warning')} onClick={() => { waitingClick(todo.id) }}>{todo.completed ? 'done' : 'waiting'}&nbsp;<span className={'bi ' + (todo.completed ? 'bi-check' : 'bi-clock')}></span></button><button className='btn btn-danger' onClick={() => { deleteClick(todo.id) }}><span className='bi bi-trash'></span></button></td>
                            </tr>

                        )
                    })}

                </tbody>
            </table>
            {/* page control */}
            <div>
                <button className='btn btn-outline-primary todo-space' onClick={() => { setCurPage(1) }} disabled={curPage === 1}>First</button>
                <button className='btn btn-outline-primary todo-space' onClick={() => (curPage > 1 ? setCurPage(curPage - 1) : null)}>Previous</button>
                <span className='todo-space'>{curPage}&nbsp;/&nbsp;{numPage}</span>
                <button className='btn btn-outline-primary todo-space' onClick={() => (curPage < numPage ? setCurPage(curPage + 1) : null)}>Next</button>
                <button className='btn btn-outline-primary todo-space' onClick={() => { setCurPage(numPage) }} disabled={curPage === numPage}>Last</button>
            </div>
        </div>
    );
}

export default Todo;