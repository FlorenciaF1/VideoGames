const { Router } = require('express');
require('dotenv').config();
const {API_KEY} = process.env

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Genre, Videogame} = require ('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const apiInfo = await apiUrl.data.results.map((el) => {
        return {
            name: el.name,
            descripcion: el.descripcion,
            fechaDeLanzamiento: el.fechaDeLanzamiento,
            rating: el.rating,
            plataformas: el.plataformas,
            genre: el.genres.map(el => el),
            image: el.background_image
        };
    });
    return apiInfo;
}; */

const getApiInfo = async () => {
    let response;
    let apiInfo = [];

    for (let i = 1; i <= 5; i++) {
      response = (await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data
      apiInfo.push(response.results.map((el) => ({
        id: el.id,
        image: el.background_image,
        name: el.name,
        genres: el.genres.map((e) => e.name),
        rating: el.rating,
        plataformas: el.platforms.map((e) => e.platform.name),
        descripcion: el.description,
        fechaDeLanzamiento: el.released,
        }))
      );
      apiInfo = apiInfo.flat();
    }
    return apiInfo;
}

const getDbInfo = async () => {
    return await Videogame.findAll({
        includes: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllVideogames = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get('/videogames', async (req, res, next) => {
    const name = req.query.name
    try {
        let videogamesTotal = await getAllVideogames();
    if (name){
        let videogameName = videogamesTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        videogameName.length ? // se encontro algo en la linea de arriba?
        res.status(200).json(videogameName) :
        res.status(404).send('No esta el videojuego');
    } else {
        res.status(200).send(videogamesTotal)
    }
    } catch (error) {
        next(error)
    }
})

// router.get('/genres', async (req, res, next) => {
//     try {
//         const action= await Genre.findOne({where:{
//             name:'action'
//         }})
//         if(!action){
//             const genresApi = await axios.get('https://api.rawg.io/api/genres?key=0215e4af57214a82ba90450900a5f5a4')
//         const genres = genresApi.data.results.map(el =>{
//             return{
//             id: el.id,
//             name:el.name
//             } 
//         })
//         await Genre.findOrCreate({
//         })
//         res.send(genres);
//     }else{
//         const allGenres = await Genre.findAll();
//         res.send(allGenres);
//         }
//     } catch (error) {
//         next(error)
//     }
// })

router.get('/genres', async (req, res, next) => {
  const response = (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results
    .map((g) => g.name)
    .map((e) => {
      return Genre.findOrCreate({
        where: { name: e },
      });
    });
  const allGenres = await Genre.findAll();

  return res.json(allGenres);
});

        // el primer map me va a devolver muchos arreglos
      /*   const genEach = genres.map( el => { // hago un segundo map para ingresar al for loop -- googlear metodo .flat()
            for (let i = 0; i < el.length; i++) return el[i]}) */
        // genres.forEach(e => {
        //     Genre.findOrCreate({// se fija si esta. y si no esta, lo crea
        //         where: {name: e}// donde el nombre sea igual al elemento
        //     })
        // });

router.post('/videogames', async (req, res) => {
    let {
        name,
        descripcion,
        fechaDeLanzamiento,
        rating,
        plataformas,
        createdInDb,
        genre,
    } = req.body

    let videogamesCreated = await Videogame.created ({
        name,
        descripcion,
        fechaDeLanzamiento,
        rating,
        plataformas,
        createdInDb
    })

    let genreDb = await Genre.findAll({
        where: { name : genre}
    })
    videogamesCreated.addGenre(genreDb) // metodo de SQL que lo que hace es traerme de la tabla lo que le pido por parametro
    res.send('Videojuego creado correctamente')
});

router.get('/videogames/:id', async (req, res) => {
    const id = req.params.id;
    const videogamesTotal = await getAllVideogames()
    if (id){
        let videogamesId = /* await */ videogamesTotal.filter( el => el.id == id)
        videogamesId.length ?
        res.status(200).json(videogamesId) :
        res.status(400).send('No encontre ese videojuego')
    }
})

module.exports = router;