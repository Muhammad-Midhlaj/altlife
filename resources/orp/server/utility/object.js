export function objectToNull(obj) {
    if (obj.constructor === Object && Object.entries(obj).length <= 0) {
        return null;
    } else {
        if (obj.name === '') {
            return null;
        }
    }
    return obj;
}
