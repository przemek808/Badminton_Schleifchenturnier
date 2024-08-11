'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    FormText,
} from 'react-bootstrap'
import { processCsv } from 'src/csv-import/process-csv'
import { readCsv } from 'src/csv-import/read-csv'
import { useRouter } from 'next/navigation'
import { HttpClient } from 'src/http-client/http-client'
import { useHttpClient } from 'src/hooks/use-http-client'

const errorStates = {
    noFile: 'NO_FILE',
    parsingError: 'PARSING_ERROR',
} as const

type ErrorStates = (typeof errorStates)[keyof typeof errorStates]

export function ImportPlayer() {
    const [file, setFile] = useState<File>()
    const [error, setError] = useState<ErrorStates>()

    const router = useRouter()
    const client = useHttpClient()

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        event.stopPropagation()

        if (file === undefined) {
            setError(errorStates.noFile)
            return
        }

        try {
            const csvText = await readCsv(file)
            const playerData = processCsv(csvText)

            client.players.postBulk(playerData)

            router.refresh()
        } catch (error) {
            console.error(error)
            setError(errorStates.parsingError)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup controlId="csvImport">
                <FormLabel>Spieler daten von CSV importieren</FormLabel>
                <FormControl
                    type="file"
                    accept=".csv"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFile(event.target.files?.[0])
                    }}
                />
                <FormText className="text-muted">
                    CSV Datei wird lokal gelesen und ausgewertet
                </FormText>
            </FormGroup>

            <Button variant="primary" type="submit" className="mt-3">
                Spieler importieren
            </Button>
        </Form>
    )
}
