import path from 'node:path'
import { rspack, type Stats, type Configuration } from '@rspack/core'
import { writeFile } from 'node:fs/promises'

function buildConfig(
    projectRootFolder: string,
    project: 'client' | 'server',
    main: string,
): Configuration {
    return {
        mode:
            process.env.NODE_ENV === 'production'
                ? 'production'
                : 'development',
        entry: {
            main,
        },
        output: {
            path: path.resolve(projectRootFolder, 'target', 'build', project),
            clean: true,
            filename: `[name]-[contenthash].js`,
        },
        plugins: [
            new rspack.CopyRspackPlugin({
                patterns: [
                    {
                        from: 'bootstrap.min.css',
                        to: path.resolve(
                            projectRootFolder,
                            'target',
                            'build',
                            'bootstrap',
                        ),
                        toType: 'dir',
                        context: path.resolve(
                            projectRootFolder,
                            'node_modules',
                            'bootstrap',
                            'dist',
                            'css',
                        ),
                    },
                ],
            }),
        ],
    }
}

async function compileProject(config: Configuration): Promise<Stats> {
    const compiler = rspack(config)

    return new Promise((resolve, reject) => {
        compiler.run((error, stats) => {
            if (error !== null) {
                reject(error)
                return
            }

            if (stats === undefined) {
                reject(new Error('No compiler or stats are defined'))
                return
            }

            resolve(stats)
        })
    })
}

async function extractBundleName(stats: Stats) {
    if (stats.hasErrors()) {
        throw new Error(`Stats contains errors: ${stats.toString()}`)
    }

    const data = stats.toJson({
        all: false,
        assets: true,
        outputPath: true,
    })

    const bundleName = data.assets?.[0]?.name

    if (bundleName === undefined) {
        throw new Error('No bundle name could be gathered from rspack stats')
    }

    return bundleName
}

export async function buildClient(): Promise<void> {
    const rootFolder = process.cwd()
    const main = path.resolve(
        rootFolder,
        'target/build/src/frontend/app-client/entry-client.js',
    )
    const config = buildConfig(rootFolder, 'client', main)
    const stats = await compileProject(config)
    const bundleName = await extractBundleName(stats)

    await writeFile(
        path.resolve(rootFolder, 'target', 'build', 'bundle-name'),
        bundleName,
    )
}

buildClient()
