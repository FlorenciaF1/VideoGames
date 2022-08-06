import React, { useState } from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getVideogames, getGenres, filterVideogamesByGenres, filterCreated, orderByName} from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';

export default function Home (){

    const dispatch = useDispatch();
    const allVideogames = useSelector ((state) => state.videogames)
    const allGenres = useSelector ((state) => state.genres)

    const [orden, setOrden] = useState('')

    const [currentPage,setCurrentPage] = useState(1) // estado local, inicia siempre en la pagina uno
    const [videogamesPerPage] = useState(15) // estado local, me piden 15 videojuegos por pagina
    const indexOfLastVideogame = currentPage * videogamesPerPage // indice del ultimo personaje: pagina actual * cantidad de personajes por pagina / 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // indice del primer personaje: indice del ultimo - cantidad de personajes por pagina / 0
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect (() => {
        dispatch(getVideogames());
        dispatch(getGenres());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    };

    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };

    function handleFilterGenres(e){
        dispatch(filterVideogamesByGenres(e.target.value))
    };

    function handleFilterCreated (e) {
        dispatch(filterCreated(e.target.value))
    };

    return (
        <div>
            <Link to = '/videogames'>Crear personaje</Link>
            <h1>VIDEOJUEGOS</h1>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar los videojuegos
            </button>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'desc'>Descendente</option>
                </select>
                <select onChange = {e=>handleFilterGenres(e)}>
                    <option value = 'All'>Todos</option>
                    {allGenres.map( el => (
                            <option>{el.name}</option>
                        ))
                    }
                </select>
                <select onChange = {e=>handleFilterCreated(e)}>
                    <option value = 'All'>Todos</option>
                    <option value = 'Created'>Creados</option>
                    <option value = 'Api'>Existentes</option>
                </select>
                <Paginado
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
                />
                {currentVideogames?.map((el) => {
                    return (
                        <div>
                            <Link to = {'/home/' + el.id}>
                                <Card name={el.name} genre={el.genre} image={el.image} key={el.id}/>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}