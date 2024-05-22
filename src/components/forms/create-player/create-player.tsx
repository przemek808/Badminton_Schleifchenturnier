'use client'

import { FormEvent, useState } from 'react'
import { createPlayer } from './create'

export function CreatePlayer() {
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')

    async function handleSubmit(event: FormEvent) {
        console.log({ name, rating })
        event.preventDefault()

        createPlayer({ name, rating: parseInt(rating) })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                />
            </label>

            <label>
                Rating:
                <input
                    type="text"
                    value={rating}
                    onChange={(event) => {
                        setRating(event.target.value)
                    }}
                />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}
