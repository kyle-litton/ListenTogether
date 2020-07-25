
export const addToken = (Token) => dispatch =>{
    dispatch({
        type: 'ADD_TOKEN',
        payload: Token
    })
}

export const setUsername = (Username) => dispatch =>{
    dispatch({
        type: 'SET_USERNAME',
        payload: Username
    })
}

export const setGroup = (Group) => dispatch =>{
    dispatch({
        type: 'SET_GROUP',
        payload: Group
    })
}

export const setIsOwner = (val) => dispatch =>{
    dispatch({
        type: 'SET_ISOWNER',
        payload: val
    })
}

export const setOwnerToken = (val) => dispatch =>{
    dispatch({
        type: 'SET_OWNERTOKEN',
        payload: val
    })
}