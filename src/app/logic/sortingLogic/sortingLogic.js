export class SortAnimation{
    constructor(status, indx1, indx2){
        this.status = status;
        this.indx1 = indx1;
        this.indx2 = indx2
    }
}

export function generateArray(length, max_val){
    const tmpArray = []
    for (let i = 0; i < length; i++){
        tmpArray.push({
            value: Math.floor(Math.random() * max_val) + 1,
            status: 'unsorted'
        })
    }

    return tmpArray
}

export function sortingDriver(algorithm, array){

    switch (algorithm) {
        case 'bubble':
            console.log('Called')
            return bubbleSort(array)

        
        case 'heap':
            console.log('heap called')
            break;
            
        case 'merge':
            console.log('merge called')
            break;
    
        default:
            break;
    }
}

function bubbleSort(array){

    let animation_sequence = []

    // create an array to work off of
    const arr = array.map(item => item.value)

    for (let i = 0; i < arr.length - 1; i++){
        for (let j = 0; j < arr.length - 1 - i; j++){
            animation_sequence.push(new SortAnimation('comparing', j, j + 1))

            if (arr[j] > arr[j + 1]){
                animation_sequence.push(new SortAnimation('preswapping', j, j + 1))
                animation_sequence.push(new SortAnimation('swapping', j, j + 1))
                
                let largerVal = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = largerVal

            }
        }
        animation_sequence.push(new SortAnimation('sorted', arr.length - 1 - i, arr.length - 1 - i))
    }
    animation_sequence.push(new SortAnimation('sorted', 0, 0))
    return animation_sequence
}

function heapSort(array){
    
}