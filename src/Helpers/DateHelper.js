export function dateToReadable(date) {
    let d = new Date(date)
    return d.toLocaleDateString('de-CH')
}

export function dateToTimestamp(date) {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let d = new Date(date)
    return (new Date(d - tzoffset)).toISOString().split('T')[0];
}