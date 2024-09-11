import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const NewTaskModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleCreateTask = () => {
        const newTask = {
            id: Date.now(),  // Unique ID based on timestamp
            title,
            description,
            history: [],
        };

        dispatch({
            type: 'ADD_BLOCK',
            payload: {
                task: newTask,
                lane: 'To Do',  // Default lane
            },
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div >
            <div >
                <h2>Create New Task</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                />
                <button onClick={handleCreateTask}>Create Task</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default NewTaskModal;
