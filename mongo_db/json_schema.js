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