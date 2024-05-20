// Animate class
export class Animation {
    constructor(status, row, col) {
        this.status = status,
        this.row = row,
        this.col = col
    }
}

// Generate a new grid
export function generateGrid(rows, columns, weighted) {
    // generate a grid
    const tmpGrid = [];
    for (let i = 0; i < rows; i++) {
        const tmpRow = [];
        for (let j = 0; j < columns; j++) {
            if (weighted) {
                tmpRow.push(`w${Math.floor(Math.random() * 4)}_unvisited`);
            } else {
                tmpRow.push('w0_unvisited');
            }
        }
        tmpGrid.push(tmpRow);
    }
    
    // define vertical and horzontal midpoints
    const middle_row = Math.floor((rows - 1) / 2)
    const middle_col = Math.floor((columns - 1) / 2)
    
    // generate random starting and ending points
    const starting_coords = [
        Math.floor(Math.random() * middle_row) + 1, 
        Math.floor(Math.random() * middle_col) + 1
    ]
    const ending_coords = [
        Math.floor(Math.random() * (rows - middle_row)) + middle_row - 1, 
        Math.floor(Math.random() * (columns - middle_col)) + middle_col - 1, 
    ]

    // update grid
    tmpGrid[starting_coords[0]][starting_coords[1]] = 'start'
    tmpGrid[ending_coords[0]][ending_coords[1]] = 'goal'
    
    return {
        tmpGrid: tmpGrid,
        starting_coords: starting_coords,
        ending_coords: ending_coords
    };
}

// Boundary Driver
// gridState, boundaryPattern -> animation_sequence
export function boundaryDriver(gridState, boundaryPattern){
    // declare 
    
    // declare dimensions
    const { rows, cols, grid } =  gridState
    let animation_sequence = []

    switch (boundaryPattern) {
        case 'h_div':
            animation_sequence = recursiveDivison(gridState, true)
        case 'v_div':
            console.log('vertical divison called')
        case 'f_bird':
            console.log('flappy bird called')
        default:
            break;
    }

    const sequence_prefix = constructBoundaryPrefix( gridState )
    const return_sequence = sequence_prefix.concat(animation_sequence)

    return {
        animation_sequence: return_sequence
    }
    
}

function constructBoundaryPrefix( gridState ){

    const { rows, cols, starting_coords, ending_coords } = gridState
    const sequence_prefix = []
    
    // remove existing starting & goal
    sequence_prefix.push(new Animation('w0_unvisited', starting_coords[0], starting_coords[1]))
    sequence_prefix.push(new Animation('w0_unvisited', ending_coords[0], ending_coords[1]))
    
    // add new starting and goal nodes
    sequence_prefix.push(new Animation('start', 1, 0))
    sequence_prefix.push(new Animation('goal', rows - 2, cols - 1))

    // add border boundary - top & bottom walls
    for (let i = 0; i < cols; i++){
        sequence_prefix.push(new Animation('boundary', 0, i))
        sequence_prefix.push(new Animation('boundary', rows - 1, cols - 1 - i))
    }

    // add border boundary - side walls 
    for (let i = 0; i < rows; i++){
        if (i === 1){
            continue
        }
        sequence_prefix.push(new Animation('boundary', i, 0))
        sequence_prefix.push(new Animation('boundary', rows - 1 - i, cols - 1))
    }
    return sequence_prefix
}

// recursive division
function recursiveDivison(gridState, horizontal_start){
    let animation_sequence = []
    
    const { rows, cols } = gridState
    // create a deep copy of the grid to prevent unwanted updates
    const updatedGrid = gridState.grid.map(row => [...row]);
    let passage_grid = new Array(rows)
        .fill(false)
        .map(() => new Array(cols).fill(false))

    // define a helper function to return a random number
    function randomNum(min, max){
        return Math.floor(Math.random() * (max - min) + min)
    }

    // helper functions to make modifications to passage grid
    function addHPassage(row, col) {
        [col - 1, col, col + 1].forEach(c => passage_grid[row][c] = true);
    }

    function addVPassage(row, col) {
        [row - 1, row, row + 1].forEach(r => passage_grid[r][col] = true);
    }
      

    // helper function to draw a line dividing the given sextion of the grid
    function divide(rStart, rEnd, cStart, cEnd, horizontal, last_passage){
        if (rEnd - rStart < 4 || cEnd - cStart < 4){
            return
        }
        
        if (horizontal){
            // randomly select a barrier position != the last passage 
            let barrier_row = randomNum(rStart + 1, rEnd - 1)
            while (barrier_row === last_passage){
                barrier_row = randomNum(rStart + 1, rEnd - 1)
            }
            // generate and store a new random passage through the barrier
            const passage_col = randomNum(cStart + 1, cEnd - 1)
            addVPassage(barrier_row, passage_col)
            
            // animations & grid updates to implement barrier & passage
            for (let i = cStart; i < cEnd; i++){
                // confirm that this isnt the passage or part of another passage
                if (i !== passage_col && !passage_grid[barrier_row][i]){
                    animation_sequence.push(new Animation('boundary', barrier_row, i))
                    updatedGrid[barrier_row][i] = 'boundary'
                }
            }
            // recursively divide above and below the previously drawn horizontal barrier
            divide(rStart, barrier_row, cStart, cEnd, false, passage_col)
            divide(barrier_row + 1, rEnd, cStart, cEnd, false, passage_col)
        } else {
            // randomly select a barrier != to the last passage 
            let barrier_col = randomNum(cStart + 1, cEnd - 1)
            while (barrier_col === last_passage){
                barrier_col = randomNum(cStart + 1, cEnd - 1)
            }
            // generate and store a new random passage throughh the barrier
            const passage_row = randomNum(rStart + 1, rEnd - 1)
            addHPassage(passage_row, barrier_col)

            // animations & grid updates to implement barrier & passage
            for (let i = rStart; i < rEnd; i++){
                if (i !== passage_row && !passage_grid[i][barrier_col]){
                    animation_sequence.push(new Animation('boundary', i, barrier_col))
                    updatedGrid[i][barrier_col] = 'boundary'
                }
            }
            // recursively divide left and right of the previously drawn barrier
            divide(rStart, rEnd, cStart, barrier_col, true, passage_row)
            divide(rStart, rEnd, barrier_col + 1, cEnd, true, passage_row)
        }
    }

    divide(1, rows - 1, 1, cols - 1, horizontal_start === true, 0)
    return animation_sequence
}