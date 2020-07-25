export const hasLoaded = (val) => dispatch =>{
    dispatch({
        type: 'SET_LOADED',
        payload: val
    })
}