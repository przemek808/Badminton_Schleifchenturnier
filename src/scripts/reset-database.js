const { existsSync, writeFileSync, readFileSync } = require('fs')
const { resolve } = require('path')

function resetDatabase() {
    const databaseFilePath = resolve(process.cwd(), 'json-server/db.json')
    const databaseInitFilePath = resolve(
        process.cwd(),
        'json-server/initial-db.json',
    )

    const initialDatabaseContent = require(databaseInitFilePath)

    if (existsSync(databaseFilePath)) {
        console.info('Found existing database file')

        writeFileSync(databaseFilePath, JSON.stringify(initialDatabaseContent))

        console.info('Database reset completed')
    } else {
        console.info('No database file exists. Creating...')

        writeFileSync(databaseFilePath, JSON.stringify(initialDatabaseContent))

        console.info('Database creation completed')
    }
}

resetDatabase()
