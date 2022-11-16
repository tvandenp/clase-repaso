// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************

const heroesController = require('../controllers/heroesController');


const uploadFile = require('../middlewares/multerMiddleware');

// *** Devolver todos los heroes *****/
router.get("/", heroesController.index);

// *** Crear un heroe ******/
router.get('/detail/create', heroesController.create);
router.post('/detail', uploadFile.single("imgFile"), heroesController.store);

// *** Devolver un heroe *****/
router.get('/detail/:id', heroesController.detail);

// *** Editar un heroe *****/
router.get('/detail/edit/:id', heroesController.edit);
router.put('/detail/edit/:id', uploadFile.single('imgFile'), heroesController.update);

// *** Eliminar un heroe *****/
router.delete('/detail/delete/:id', heroesController.destroy);


module.exports = router;
