export function generateArray(length, max_val){
    const tmpArray = []
    for (let i = 0; i < length; i++){
        tmpArray.push(Math.floor(Math.random() * max_val) + 1)
    }

    return tmpArray
}