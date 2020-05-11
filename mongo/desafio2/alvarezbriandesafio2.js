const mongoclient = require('mongodb').MongoClient;
const chalk = require('chalk');

const uri = "mongodb+srv://admin:betp2@cluster0-zdy6w.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongoclient(uri, {useNewUrlParser:true, useUnifiedTopology:true});



const CRUD = new Promise((resolve,reject) => {
    resolve(client.connect((err, result) =>{
                        if(!err){
                            console.log(chalk.green('Cliente conectado'));
                            let collection = result.db("sample_betp2").collection("inventors"); 
                            console.log(chalk.yellow("Se muestra la coleccion sin modificaciones:"));
                            printCollection(collection);   
                            console.log(chalk.gray("Comienzan las acciones CRUD:"));
                            accionesCrud(collection);

                        } else {
                            console.log(chalk.red(err));
                        }
                    }));
    reject("Error al realizar la coneccion con la base. Se descarta el CRUD.");
});

async function accionesCrud(collection){
                        
    let newInventor = {
        first: "Brian",
        last: "Alvarez",
        year: 1860
    }

    await insertIntoCollection(collection, newInventor)
        .then(()=> {
            console.log(chalk.green("Registro Insertado Correctamente."));
            console.log(chalk.yellow("Se muestra la coleccion con el nuevo registro:"));
            printCollection(collection);
        })
        .catch(err => {
            console.log(chalk.red("Error en insercion de Registro.", err));
    });
    
    await updateCollection(collection)
        .then(()=> {
            console.log(chalk.green("Registro actualizado Correctamente."));
            console.log(chalk.yellow("Se muestra la coleccion con la actualizacion del registro:"));
            printCollection(collection);
        })
        .catch(err => {
            console.log(chalk.red("Error en actualización de Registro.", err));
    });

    await deleteFromCollection(collection)
        .then(() => {
            console.log(chalk.green("Registro borrado correctamente."));
            console.log(chalk.yellow("Se muestra la coleccion con el registro borrado:"));
            printCollection(collection);
        })
        .catch(err => {
            console.log(chalk.red("Error en borrado de registro.", err));
    });
}

function insertIntoCollection(collection, newInventor){
    return new Promise((resolve, reject) => {
        resolve(collection.insertOne(newInventor));
        reject("No se pudo insertar el registro.");
    });
}

function updateCollection(collection){
    return new Promise((resolve, reject) => {
        resolve(collection
            .updateOne(
                {last: "Alvarez"}, 
                {$set: {year:1996} }
                )
            )
        reject("No se pudo actualizar el registro.");
    });
}

function deleteFromCollection(collection){
    return new Promise((resolve, reject) => {
        resolve(collection.deleteOne({last:"Alvarez"}));
        reject("No se pudo actualizar el registro.");
    })
}

function printCollection(collection){
    collection.find().toArray((err, result) => {
        console.log(result);
    });
}
