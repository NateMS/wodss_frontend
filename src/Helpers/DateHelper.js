export function dateToReadable(date) {
    let d = new Date(date)
    return d.toLocaleDateString('de-CH')
}

export function dateToTimestamp(date) {
    let d = new Date(date)
    return d.toISOString().split('T')[0]
}