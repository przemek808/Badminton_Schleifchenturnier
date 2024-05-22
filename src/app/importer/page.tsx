'use client'

import { ChangeEvent } from 'react'
import { readCsv } from 'src/csv-import/read-csv'

export default function Match() {
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]

        console.log(file)

        if (file) {
            readCsv(file)
        } else {
            alert('Bitte wählen Sie eine CSV-Datei aus.')
        }
    }

    return (
        <div>
            <input
                type="file"
                name="file"
                accept=".csv"
                style={{ display: 'block', margin: '10px auto' }}
                onChange={changeHandler}
            />
        </div>
    )
}
