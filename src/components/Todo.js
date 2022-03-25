import React, { useState, useEffect } from 'react';
import './style.css';

// get the local storage data back
const getLocalStorageData = () => {
    const lists = localStorage.getItem("todo");
    if (lists) {
        return JSON.parse(lists);
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalStorageData());
    const [toggleEdit, setToggleEdit] = useState(false);
    const [isEditedItem, setIsEditedItem] = useState('');

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(items));
    }, [items]);


    const addItem = () => {
        if (!inputData) {
            alert("please fill the data");
            return;
        }
        else if (inputData && toggleEdit) {
            setItems(items.map((item) => {
                if (item.id === isEditedItem) {
                    return { ...item, name: inputData }
                }
            }));
            setInputData("");
            setToggleEdit(false);
            setIsEditedItem('');
            return items;
        }
        const myNewInputData = {
            id: new Date().getTime().toString(),
            name: inputData,
        }
        setItems([...items, myNewInputData]);
        setInputData("");
    }

    const deleteItem = (taskId) => {
        const updatedItem = items.filter((item) => {
            return item.id !== taskId;
        });
        setItems(updatedItem);

        if (taskId === items.find((item) => {
            return item.id === taskId;
        })) {
            setInputData("");
            setToggleEdit(false);
            setIsEditedItem('');
        }
    }

    const removeAll = () => {
        setItems([]);
        setInputData("");
        setToggleEdit(false);
        setIsEditedItem('');
    }

    const editItem = (taskId) => {
        const itemEdited = items.find((item) => {
            return item.id === taskId;
        });
        setInputData(itemEdited.name);
        setToggleEdit(true);
        setIsEditedItem(taskId);
    }

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src='./images/todo.svg' alt='' />
                        <figcaption>Add your task here</figcaption>
                    </figure>

                    <div className='addItems'>
                        <input
                            className='form-control'
                            type="text"
                            placeholder='✍️  Add task'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {!toggleEdit ?
                            <i className="fa fa-plus add-btn" onClick={() => addItem()}></i> :
                            <i className="far fa-edit add-btn" onClick={() => addItem()}></i>
                        }
                    </div>

                    {/* show our items */}
                    <div className='showItems'>
                        {items.map((item) => {
                            return (
                                <div className='eachItem' key={item.id}>
                                    <h3>{item.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" onClick={() => editItem(item.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(item.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                    {/* remove all button */}
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={() => removeAll()}><span>Check List</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo