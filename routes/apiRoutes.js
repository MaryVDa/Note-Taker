//dependencies
const path = require('path');
const fs = require('fs');

//npm package that allows for unique ids to be created
var uniqueid = require('uniqueid');

//routing
module.exports = (app) => {
    //GET /api/notes should read the db.json file and return all saved notes as JSON
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    //POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
    app.post('/api/notes', (req, res) => {
        let db = fs.readFileSync(path.join(__dirname, '../db/db.json'));
        db = JSON.parse(db);
        //creating body for note
        let userNote = {
            title: req.body.title,
            text: req.body.title,
            //creating unique id for each note
            id: uniqueid(),
        };
        //pushing created note to be written in the db.json file
        db.push(userNote);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(db));
        res.json(db);
    });

    //DELETE /api/notes/:id should receive a query parameters containing the id of a note to delete
    app.delete('/api/notes/:id', (req, res) => {
        //reading notes from db.json
        let db = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')))
        //removing note with id
        let deleteNotes = db.filter(item => item.id !== req.params.id);
        //rewriting note to db.json
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(deleteNotes));
        res.json(deleteNotes);
    });
}