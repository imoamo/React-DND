import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import BlockModal from './BlockModal';
import BlockPreview from './BlockPreview';
import NewTaskModal from './NewTaskModal';

const Swimlanes = () => {
    const lanes = useSelector((state) => state.lanes.lanes);
    const blocks = useSelector((state) => state.blocks.blocks);
    const searchTerm = useSelector((state) => state.filter.searchTerm);

    const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ isOpen: false, blockId: null, destinationLane: '' });
    const [previewData, setPreviewData] = useState({ isOpen: false, blockId: null });

    const dispatch = useDispatch();

    const handleDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        setModalData({ isOpen: true, blockId: parseInt(draggableId), destinationLane: destination.droppableId });

        dispatch({
            type: "MOVE_BLOCK",
            payload: {
                blockId: parseInt(draggableId),
                sourceLane: source.droppableId,
                destinationLane: destination.droppableId,
            },
        });
    };

    const handleBlockClick = (blockId) => {
        setPreviewData({ isOpen: true, blockId });
    };

    const closeModal = () => {
        setModalData({ isOpen: false, blockId: null, destinationLane: '' });
    };

    const closePreview = () => {
        setPreviewData({ isOpen: false, blockId: null });
    };

    const handleFilterChange = (e) => {
        dispatch({ type: 'SET_FILTER', payload: e.target.value });
    };

    return (
        <>
            <button onClick={() => setIsNewTaskModalOpen(true)} className="add-task-button">
                Add New Task
            </button>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search blocks..."
                    value={searchTerm}
                    onChange={handleFilterChange}
                    className="search-input"
                />
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="lane-container">
                    {Object.keys(lanes).map((lane) => (
                        <Droppable droppableId={lane} key={lane}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="lane"
                                >
                                    <h2>{lane}</h2>
                                    {lanes[lane].filter(blockId => blocks[blockId].title.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((blockId, index) => (
                                            <Draggable draggableId={String(blockId)} index={index} key={`${lane}-${blockId}`}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="block"
                                                        onClick={() => handleBlockClick(blockId)}  // Open preview on click
                                                    >
                                                        <h3>{blocks[blockId].title}</h3>
                                                        <p>{blocks[blockId].description}</p>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            <BlockModal
                isOpen={modalData.isOpen}
                onClose={closeModal}
                blockId={modalData.blockId}
                destinationLane={modalData.destinationLane}
            />

            <BlockPreview
                isOpen={previewData.isOpen}
                onClose={closePreview}
                blockId={previewData.blockId}
            />

            <NewTaskModal
                isOpen={isNewTaskModalOpen}
                onClose={() => setIsNewTaskModalOpen(false)}
            />
        </>
    );
};

export default Swimlanes;
