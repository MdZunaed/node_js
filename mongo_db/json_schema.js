db.createCollection("students", {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: [
                'name',
                'age',
                'jod'
            ],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'Name must be a String',
                    maxLength: 30
                },
                age: {
                    bsonType: 'int',
                    description: 'Age must be a number',
                    minimum: 12,
                    maximum: 50
                },
                jod: {
                    bsonType: 'date',
                    description: 'jod should be a date'
                },
                course: {
                    bsonType: 'array',
                    items: {
                        bsonType: 'string'
                    },
                    description: 'course should be a array of String'
                }
            }
        }
    }
})



// -To show DBs present in system
// show dbs

// -To create a new DB / Switch DB
// use db_name

// -To create a new collection
// db.createCollection(‘name’)

// -To view the collection in DB
// show collections

// -To create a new document in collection
// db.collection_name.insertOne( {})

// -To create multiple document in collection
// db.collection_name.insertMany( [ {}, {} ] )

// -To view document in collection
// db.collection_name.find()