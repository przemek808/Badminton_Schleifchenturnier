export async function readCsv(file: File): Promise<string> {
    return file.text()
}
