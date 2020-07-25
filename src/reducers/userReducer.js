export default (state = {}, action) =>{

    switch(action.type){

        case 'ADD_TOKEN':
            return{
                ...state,
                token: action.payload
            }
        case 'SET_USERNAME':
            return{
                ...state,
                username: action.payload
            }
        case 'SET_GROUP':
            return{
                ...state,
                group: action.payload
            }
        case 'SET_ISOWNER':
            return{
                ...state,
                isOwner: action.payload
            } 
        case 'SET_OWNERTOKEN':
            return{
                ...state,
                ownerToken: action.payload
            }       
        default:
            return state

    }

}