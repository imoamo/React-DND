const initialState = {
    lanes: {
        'To Do': [1, 2, 3],
        'In Progress': [],
        'Done': []
    },
};

const lanesReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'ADD_BLOCK': {
            const { task, lane } = action.payload;

            return {
                ...state,
                lanes: {
                    ...state.lanes,
                    [lane]: [...state.lanes[lane], task.id],
                },
            };
        }

        case 'MOVE_BLOCK': {
            const { blockId, sourceLane, destinationLane } = action.payload;

            return {
                ...state,
                lanes: {
                    ...state.lanes,
                    [sourceLane]: state.lanes[sourceLane].filter(id => id !== blockId),
                    [destinationLane]: [...state.lanes[destinationLane], blockId],
                },
            };
        }
        default:
            return state;
    }
};

export default lanesReducer;
