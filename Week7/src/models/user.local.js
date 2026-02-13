let db = require('./db.json')
const { uuid } = require('uuidv4')
const fs = require('fs')
const path = require('path')
const tableName = 'users'
const writeFile = (data) => {
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFile(path.join(__dirname, 'db.json'), jsonData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Data written to file successfully');
        }
    });
}
const UserModel = {
    // SELECT * FROM users;
    getAllUsers() {
        return db;
    },
    // SELECT * FROM users WHERE username = $username;
    findUserByUsername(username) {
        let users = db.filter(user => user.username === username)
        return users && users.length > 0 ? users[0] : null
    },
    getUserById(id) {
        return db.filter(user => user.id === id)
    },
    insertUser(inputData) {
        if (inputData) {
            inputData.id = uuid()
        }
        db.push(inputData)
        writeFile(db)
    },
    updateUser(data, userId) {
        db.filter(user => {
            if (user.id === userId) {
                user = data
            }
        })
        writeFile([...db])
    },
    delUser(id) {
        db = db.filter(user => user.id !== id)
        writeFile(db)
    }
}
module.exports = UserModel