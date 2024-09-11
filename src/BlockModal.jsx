import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './BlockModal.css';  // Import the CSS file for BlockModal

const BlockModal = ({ isOpen, onClose, blockId, destinationLane }) => {
    const [formData, setFormData] = useState({
        comment: '',
        additionalField1: '',
        additionalField2: '',
    });
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const historyEntry = {
            lane: destinationLane,
            timestamp: new Date().toISOString(),
            comment: formData.comment,
            additionalData: {
                field1: formData.additionalField1,
                field2: formData.additionalField2,
            },
        };

        dispatch({
            type: 'UPDATE_BLOCK',
            payload: {
                id: blockId,
                data: { historyEntry }
            },
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal">
                <h2>Move Block to {destinationLane}</h2>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    placeholder="Add a comment"
                    rows={3}
                    className="modal-input"
                />
                <input
                    name="additionalField1"
                    value={formData.additionalField1}
                    onChange={handleInputChange}
                    placeholder="Additional Field 1"
                    className="modal-input"
                />
                <input
                    name="additionalField2"
                    value={formData.additionalField2}
                    onChange={handleInputChange}
                    placeholder="Additional Field 2"
                    className="modal-input"
                />
                <div className="modal-buttons">
                    <button onClick={handleSubmit} className="modal-button modal-submit">Submit</button>
                    <button onClick={onClose} className="modal-button modal-cancel">Cancel</button>
                </div>
            </div>
        </>
    );
};

export default BlockModal;
