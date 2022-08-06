 const initialState = {
    videogames: [],
    allVideogames: [],
    genres: []
} 

function rootReducer(state = initialState, action){
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
//                consola: console.log(action.payload)
            }
        case 'GET_GENRES':
            return {
                ...state,
               genres: action.payload,
            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
            state.videogames.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.videogames.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                videogames: sortedArr
            }
        case 'FILTER_BY_GENRE':
            const allVideogames = state.allVideogames // siempre hacer la logica antes del return
            const genresFiltered = action.payload === 'All' ? allVideogames : allVideogames.filter(el => el.genres === action.payload) // si mi payload es todo, devolvemelo. y si no, entra a videogames y filtramelo por el payload que te llega
            return {
                ...state,
                videogames: genresFiltered
            }
        case 'FILTER_CREATED':
            // const allVideogames2 = state.allVideogames
            const createdFilter = action.payload === 'created' ? state.allVideogames.filter(el => el.createdInDb) : state.allVideogames.filter(el => !el.createdInDb) 
            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : createdFilter
            }
            default: 
                return state;
    }
}

export default rootReducer;


// function rootReducer(state = initialState, action) {
//     switch (action.type) {
//         case 'GET_VIDEOGAMES':
//             return {
//                 ...state,
//                 videogames: action.payload,
//                 allVideogames: action.payload
//             }
//             case 'GET_NAME_VIDEOGAMES':
//                 return {
//                     ...state,
//                     videogames: action.payload
//                 }
//             case 'FILTER_BY_STATUS':
//                 const allVideogames = state.allVideogames
//                 const statusFiltered = action.payload === 'All' ? allVideogames : allVideogames // sigue pero no puedo leer
//                 return {
//                     ...state,
//                     videogames: statusFiltered
//                 }
//                 case 'FILTER_CREATED':
//                     const createdFilter = action.payload === 'created' ? state.allVideogames. // sigue pero no puedo leer

//     }
// } 