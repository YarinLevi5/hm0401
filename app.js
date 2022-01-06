const fs = require('fs-extra');
let _ = require('lodash');
var validator = require('validator');

//callback
fs.readJSON('./resources/users.json', (err, obj) => {
    if (err) console.error(err)
    console.log(obj);;
});


// promiss
fs.readJSON('./resources/users.json')
    .then(obj => {
        console.log(obj);
    })
    .catch(error => {
        console.log(error);
    });



// async await
async function readObj() {
    try {
        const obj = await fs.readJSON('./resources/users.json');
        console.log(obj);
    } catch (error) {
        console.log(error);
    }
}

readObj();



let json = require('./resources/users.json');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {
    v4: uuidv4
} = require('uuid');

json.forEach(key => {
    let userAge = (_.get(key, 'user_data.age', 18))
    console.log(userAge);
    key.canDrink = userAge > 21
    if (key.user_data.is_admin) {
        key.user_name = `${ key.user_name} admin`;
    }
    const myPlaintextPassword = key.password;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    //console.log(hash)
    key.password = hash;
    key['id'] = uuidv4();
    if (!validator.isEmail(key.email))
        key.email = "notvalid@gmail.com";
});

async function createJsonFile() {
    try {
        await fs.writeJson('./resources/user-parsed.json', json)
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}
createJsonFile();