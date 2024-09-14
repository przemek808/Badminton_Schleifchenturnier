import { z, ZodType } from 'zod'
import { buildUrl } from './build-url'
import { logger } from 'src/logger/logger'

export type EntityClient<Entity, MutationPayload> = {
    delete: (id: string) => Promise<void>
    get: (id: string) => Promise<Entity>
    getAll: () => Promise<Entity[]>
    patch: (id: string, data: MutationPayload) => Promise<void>
    post: (data: MutationPayload) => Promise<void>
    postBulk: (data: MutationPayload[]) => Promise<void>
}

type EntityClientArgs<EntitySchema extends ZodType<any, any, any>> = {
    entitySchema: EntitySchema
    fetch: typeof fetch
    host: string | null
    endpoint: string
}

export function getEntityClient<
    EntitySchema extends ZodType<any, any, any>,
    MutationPayloadSchema extends ZodType<any, any, any>,
>({
    endpoint,
    entitySchema,
    fetch,
    host,
}: EntityClientArgs<EntitySchema>): EntityClient<
    z.infer<EntitySchema>,
    z.infer<MutationPayloadSchema>
> {
    return {
        async delete(id: string) {
            logger.debug('Deleting entity', { host, endpoint, id })
            const url = buildUrl(host, endpoint, id)
            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'Application/json' },
            })

            if (response.ok === false) {
                logger.error('Failed to delete entity', await response.json())
                throw new Error('Failed to fetch')
            }
            logger.debug('Entity deleted', { host, endpoint, id })
        },
        async get(id: string) {
            logger.debug('Fetching entity', { host, endpoint, id })
            const url = buildUrl(host, endpoint, id)
            const response = await fetch(url, {
                headers: { 'Content-Type': 'Application/json' },
                cache: 'no-cache',
            })
            const parsingResult = entitySchema.safeParse(await response.json())

            if (parsingResult.success === false) {
                logger.error('Failed to get entity', parsingResult.error)
                throw new Error('Failed to parse response')
            }

            logger.debug('Entity fetched', {
                host,
                endpoint,
                id,
                data: parsingResult.data,
            })
            return parsingResult.data
        },
        async getAll() {
            logger.debug('Fetching all entities', { host, endpoint })
            const url = buildUrl(host, endpoint)
            const response = await fetch(url, {
                headers: { 'Content-Type': 'Application/json' },
                cache: 'no-cache',
            })
            const parsingResult = entitySchema
                .array()
                .safeParse(await response.json())

            if (parsingResult.success === false) {
                logger.error('Failed to get all entities', parsingResult.error)
                throw new Error('Failed to parse response')
            }

            logger.debug('All entities fetched', {
                host,
                endpoint,
                data: parsingResult.data,
            })
            return parsingResult.data
        },
        async patch(id: string, data: z.infer<MutationPayloadSchema>) {
            logger.debug('Patching entity', { host, endpoint, id, data })
            const url = buildUrl(host, endpoint, id)
            const response = await fetch(url, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'Application/json' },
            })

            if (response.ok === false) {
                logger.error('Failed to patch entity', await response.json())
                throw new Error('Failed to fetch')
            }
            logger.debug('Entity patched', { host, endpoint, id, data })
        },
        async post(data: z.infer<MutationPayloadSchema>) {
            logger.debug('Posting entity', { host, endpoint, data })
            const url = buildUrl(host, endpoint)
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'Application/json' },
            })

            if (response.ok === false) {
                logger.error('Failed to post entity', await response.json())
                throw new Error('Failed to fetch')
            }
            logger.debug('Entity posted', { host, endpoint, data })
        },
        async postBulk(data: z.infer<MutationPayloadSchema>[]) {
            logger.debug('Posting bulk entities', { host, endpoint, data })
            const url = buildUrl(host, endpoint)
            const results = await Promise.allSettled(
                data.map(async (entity) => {
                    return await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(entity),
                        headers: { 'Content-Type': 'Application/json' },
                    })
                }),
            )

            const errors = results.filter(
                (result) => result.status === 'rejected',
            )

            if (errors.length > 0) {
                logger.error('Failed to post bulk entities', errors)
                throw new Error('Failed to fetch')
            }

            logger.debug('Bulk entities posted', { host, endpoint, data })
        },
    }
}
