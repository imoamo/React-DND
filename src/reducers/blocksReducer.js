const initialState = {
    blocks: {
        1: { id: 1, title: 'Task 1', description: 'Task 1 description', history: [] },
        2: { id: 2, title: 'Task 2', description: 'Task 2 description', history: [] },
        3: { id: 3, title: 'Task 3', description: 'Task 3 description', history: [] },
    },
};

const blocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_BLOCK': {
            const { id, data } = action.payload;

            return {
                ...state,
                blocks: {
                    ...state.blocks,
                    [id]: {
                        ...state.blocks[id],
                        ...data,
                        history: [...state.blocks[id].history, data.historyEntry]
                    },
                }
            };
        }
        default:
            return state;
    }
};

export default blocksReducer;
