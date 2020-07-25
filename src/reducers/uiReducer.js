export default (state = {isLoaded: false}, action) =>{

    switch(action.type){

        case 'SET_LOADED':
            return{
                ...state,
                isLoaded: action.payload
            }     
        default:
            return state

    }

}