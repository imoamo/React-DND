import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

const BlockPreview = ({ isOpen, onClose, blockId }) => {
    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Fetch block from the store
    const block = useSelector((state) => state.blocks.blocks[blockId]);

    // State for editing
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    // Update the state when the block changes
    useEffect(() => {
        if (block) {
            setEditedTitle(block.title);
            setEditedDescription(block.description);
        }
    }, [block]);

    if (!block) return null; // Return null if block is not available

    const handleEditClick = (e) => {
        e.stopPropagation();
        setIsEditModalOpen(true);
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveChanges = () => {
        // Dispatch the edit action to update the block's title and description in the store
        dispatch({
            type: 'EDIT_BLOCK',
            payload: {
                id: blockId,
                data: { title: editedTitle, description: editedDescription }
            },
        });
        setIsEditModalOpen(false);
    };

    const renderHistory = () => {
        if (!block.history.length) {
            return <p>No transition history available.</p>;
        }

        return block.history.map((entry, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
                <p>
                    <strong>Moved to {entry.destinationLane}:</strong> {new Date(entry.timestamp).toLocaleString()}
                </p>
                <p><strong>Comment:</strong> {entry.comment || "Not Available"}</p>
                <p><strong>Additional Data:</strong> {Object.keys(entry.additionalData).length > 0 ? JSON.stringify(entry.additionalData) : "Not Available"}</p>
            </div>
        ));
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Block Preview"
                ariaHideApp={false}
                style={{
                    content: {
                        maxWidth: '400px',
                        margin: 'auto',
                        padding: '20px',
                        borderRadius: '8px',
                    },
                }}
            >
                <h2>{block.title}</h2>
                <p>{block.description}</p>
                <h3>Transition History</h3>
                <div style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    padding: '10px',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9'
                }}>
                    {renderHistory()}
                </div>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={onClose} style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}>Close</button>
            </Modal>

            {isEditModalOpen && (
                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={handleEditClose}
                    contentLabel="Edit Task"
                    ariaHideApp={false}
                    className="edit-modal"
                    style={{
                        content: {
                            maxWidth: '400px',
                            margin: 'auto',
                            padding: '20px',
                            borderRadius: '8px',
                        },
                    }}
                >
                    <div>
                        <h4>Edit Task</h4>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                        />
                        <button onClick={handleSaveChanges}>Save Changes</button>
                        <button onClick={handleEditClose}>Cancel</button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default BlockPreview;
