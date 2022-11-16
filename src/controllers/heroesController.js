const fs = require('fs');
const path = require('path');

const heroesFilePath = path.join(__dirname, '../data/heroes.json');
let heroes = JSON.parse(fs.readFileSync(heroesFilePath, 'utf-8'));


const controller = {
    index: (req, res) => {
        res.render('heroes/heroes', {
            heroes
        })
    },
    create: (req, res) => {
        res.render('heroe/heroeFormCreate');
    },
    store: (req,res) => {
        // guardamos el heroe
        let newHeroe = {
            id: heroes[heroes.length - 1].id + 1,
            nombre: req.body.name,
            bio: req.body.bio,
            img: req.file.filename,
            aparicion: req.body.date,
            casa: req.body.casa
        }
        heroes.push(newHeroe);
        fs.writeFileSync(heroesFilePath, JSON.stringify(heroes, null, " "));
        res.redirect('/heroes');
    },
    detail: (req, res) => {
        const id = req.params.id;
        const heroe = heroes.find(heroe => heroe.id == id);
        res.render('heroe/heroe', {
            heroe
        })
    },
    edit: (req, res) => {
        const id = req.params.id;
        const heroe = heroes.find(heroe => heroe.id == id);
        res.render('heroe/heroeFormEdit', {
            heroe
        })
    },
    update: (req, res) => {
        // editamos el heroe que llego por parametro id
        const id = req.params.id;
        const heroeToEdit = heroes.find(heroe => heroe.id == id);

        const editHeroe = {
            id: id,
            nombre: req.body.name,
            bio: req.body.bio,
            img: req.file ? req.file.filename : heroeToEdit.img,
            aparicion: req.body.date ,
            casa: req.body.casa
        }

        // ya hemos modificado el array
        heroes.forEach((heroe, index) => {
            if(heroe.id == id) {
                heroes[index] = editHeroe;
            }
        });
        fs.writeFileSync(heroesFilePath, JSON.stringify(heroes, null, " "));
        res.redirect('/heroes');
    },
    destroy: (req, res) => {
        // Eliminamos el heroe que llego por parametro id
        const id = req.params.id;

        const finalHeroes = heroes.filter(heroe => heroe.id != id);
        fs.writeFileSync(heroesFilePath, JSON.stringify(finalHeroes, null, " "));
        res.redirect('/heroes');
    }
};

module.exports = controller;