

const initState = {
    userId: [],
}

export default function actionForReducer(state = initState, action) {
    switch(action.type) {
        case updateUserId:
            return {
                ...state,
                userId: action.payload
            }
        
            default: 
                return state
    }
}