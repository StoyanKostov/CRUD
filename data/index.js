const fs = require('fs'),
    path = require('path'),
    DB = path.join(process.cwd(), 'data', 'DB.json');

function insert(data, cb) {
    let content;
    fetch(null, (err, result) => {
        content = result;
    });

    let id = getId(content);
    content[id] = data;
    fs.writeFileSync(DB, JSON.stringify(content));
    if (typeof cb === 'function') {
        cb(null, id);
    }
}

function update(data, cb) {
    let content;
    fetch(null, (err, result) => {
        content = result;
    });

    let currUser = content[data.id];
    for( let prop in data.user ){
        currUser[prop] = data.user[prop];
    }

    fs.writeFileSync(DB, JSON.stringify(content));
    if (typeof cb === 'function') {
        cb(null, data.id);
    }
}

function fetch(id, cb) {
    let result,
        content = fs.readFileSync(DB, 'utf8');
    if (content === "") {
        result = {};
    } else {
        result = JSON.parse(fs.readFileSync(DB, 'utf8'));
    }

    if (typeof id !== 'undefined' && id !== null && id !== "") {
        if(result.hasOwnProperty(id)){
            result = result[id];
        } else {
         throw new Error( 'User does not exists' );
        }   
    }

    if (typeof cb === 'function') {
        cb(null, result);
    }
}

function remove(data, cb) {
    let content;
    fetch(null, (err, result) => {
        content = result;
    });
    if( content.hasOwnProperty(data.id) ){
        delete content[data.id];
    } else {
        throw new Error( 'User does not exist' );
    }

    fs.writeFileSync(DB, JSON.stringify(content));
    if (typeof cb === 'function') {
        cb(null, data.id);
    }
}

function getId(users) {
    let biggestId = 0;
    let ids = Object.keys(users);
    for (let idx = ids.length; idx >= 0; idx--) {
        let id = parseInt( ids[idx], 10 );
        biggestId = id > biggestId ? id : biggestId;
    }

    return biggestId += 1;
}

module.exports = {
    insert,
    update,
    fetch,
    remove
}