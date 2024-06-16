import React from 'react';
import './menubar.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Menubar() {
    const navigate = useNavigate();
    return (
        <div id='Menubar'>

            <a title='Notes' onClick={() => { navigate("/") }}><div className='menubarIcons'><img src="https://cdn-icons-png.flaticon.com/512/711/711679.png" alt="notes" /></div></a>

            <a title='Reminders' onClick={() => { toast.info("This doesn't do anything, just a prototype."); toast.info("Meanwhile you can do CRUD operations on Notes") }}><div className='menubarIcons'><img src="https://cdn-icons-png.flaticon.com/512/2985/2985052.png" alt="reminders" /></div></a>

            <a title='Archives' onClick={() => { toast.info("This doesn't do anything, just a prototype."); toast.info("Meanwhile you can do CRUD operations on Notes") }}><div className='menubarIcons'><img src="https://cdn-icons-png.flaticon.com/512/7693/7693316.png" alt="archives" /></div></a>

            <a title='Trash' onClick={() => { toast.info("This doesn't do anything, just a prototype."); toast.info("Meanwhile you can do CRUD operations on Notes") }}><div className='menubarIcons'><img src="https://cdn-icons-png.flaticon.com/512/3405/3405244.png" alt="trash" /></div></a>
        </div>
    )
}

export default Menubar;