import axios from 'axios';

//--- connection ---//
//--- All games data ---//
export function getVideogames(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/videogames",{
});
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
} 

export function getGenres(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/genres",{
});
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
} 

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function filterVideogamesByGenres(payload){
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}



// //         try {
//             const url = await axios.get('/videogames')
//             return dispatch({
//                 type: 'GET_VIDEOGAMES',
//                 payload: url.data
//             })
//         }catch(err){
//             console.log({msg:`THIS IS THE ERROR ${err}`});
//         }
//     }//

// export function getNameVideogames(name){
//     return async function (dispatch){
//         try {
//             var json = await axios.get ("https://localhost:3001/videogames?name=" + name)
//             return dispatch({
//                 type: 'GET_NAME_VIDEOGAMES',
//                 payload: json.data
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

// export function filterVideogamesByGenres(payload){
//     console.log(payload)
//     return {
//         type: 'FILTER_BY_STATUS',
//         payload:
//     }
// }