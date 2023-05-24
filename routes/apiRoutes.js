const path = require('path');
const fs = require('fs');

var uniqueid = require('uniqueid');

module.exports = (app) => {
    
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    
    app.post('/api/notes', (req, res) => {
        let db = fs.readFileSync(path.join(__dirname, '../db/db.json'));
        db = JSON.parse(db);
    
        let userNote = {
            title: req.body.title,
            text: req.body.title,
            
            id: uniqueid(),
        };
        
        db.push(userNote);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(db));
        res.json(db);
    });

    
    app.delete('/api/notes/:id', (req, res) => {
        
        let db = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')))
        
        let deleteNotes = db.filter(item => item.id !== req.params.id);
        
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(deleteNotes));
        res.json(deleteNotes);
    });
}