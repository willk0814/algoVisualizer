// Animate class
export class PathAnimation {
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

    const starting_coords = generateStartingCoords(rows, columns)
    const ending_coords = generateEndingCoordds(rows, columns)

    // update grid
    tmpGrid[starting_coords[0]][starting_coords[1]] = 'start'
    tmpGrid[ending_coords[0]][ending_coords[1]] = 'goal'
    
    return {
        tmpGrid: tmpGrid,
        starting_coords: starting_coords,
        ending_coords: ending_coords,
        gridMap: generateMap(tmpGrid, weighted)
    };
}

// Generate starting_coords
function generateStartingCoords(rows, cols){
    return [
        Math.floor(Math.random() * (rows * .30)),
        Math.floor(Math.random() * (cols * .30))
    ]
}

// Generate ending_coordds
function generateEndingCoordds(rows, cols){
    return [
        Math.floor(Math.random() * (rows * .30)) + Math.floor(rows * .70),
        Math.floor(Math.random() * (cols * .30)) + Math.floor(cols * .70)
    ]
}

// Generate an adjacency list from a grid
function generateMap(grid, weighted){

    const neighborMap = {}
    const { rows, cols } = { rows: grid.length, cols: grid[0].length}

    const weightMap = {
        'start': 0,
        'goal': 0,
        'w0_unvisited': 1,
        'w1_unvisited': 5,
        'w2_unvisited': 10,
        'w3_unvisited': 15,
    }

    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            let connections = []
            
            // check cell above
            if (i > 0 && grid[i - 1][j] !== 'boundary'){
                if (weighted){
                    connections.push([[i - 1, j], weightMap[grid[i - 1][j]]])
                } else {
                    connections.push([i - 1, j])
                }
            }

            // check cell below
            if (i < rows - 1 && grid[i + 1][j] !== 'boundary'){
                if (weighted){
                    connections.push([[i + 1, j], weightMap[grid[i + 1][j]]])
                } else {
                    connections.push([i + 1, j])
                }
            }

            // check cell to the left
            if (j > 0 && grid[i][j - 1] !== 'boundary'){
                if (weighted){
                    connections.push([[i, j - 1], weightMap[grid[i][j - 1]]])
                } else {
                    connections.push([i, j - 1])
                }
            }

            // check cell to the right
            if (j < cols - 1 && grid[i][j + 1] !== 'boundary'){
                if (weighted){
                    connections.push([[i, j + 1], weightMap[grid[i][j + 1]]])
                } else {
                    connections.push([i, j + 1])
                }
            }
            neighborMap[[i, j]] = connections;
        }
    }
    return neighborMap
}

// Pathfinding Driver
export function pathfindingDriver(algo_id, gridState){
    let animation_sequence = [];
    if (algo_id === 'BFS'){
        animation_sequence = BFS(gridState)        
    } else if (algo_id === 'DFS'){
        animation_sequence = DFS(gridState)
    } else if (algo_id === 'dijikstra'){
        console.log('dijikstra from find driver')
    } else if (algo_id === 'a*'){
        console.log('A* called from find driver')
    }

    return animation_sequence
    // Construct Final Path and add it to the end of animation sequence
}

// BFS
function BFS(gridState){

    function renderFinalPath(final_path, animation_seq){
        for (let i = 1; i < final_path.length - 1; i++){
            animation_seq.push(new PathAnimation('goal', final_path[i][0], final_path[i][1]))
        }
        return animation_seq
    }

    const { grid, gridMap, starting_coords, ending_coords, rows, columns, weighted } = gridState

    // Construct a visited array
    const visited = Array.from({ length: rows }, () => Array(columns).fill(false))

    // return animation_sequence
    const animation_seq = []

    // a queue to use for maintaining possible paths
    let queue = [[starting_coords]]

    while (queue.length > 0){
        for (let i = 0; i < queue.length; i++){
            let current_path = queue.shift()
            let current_node = current_path[current_path.length - 1]

            if (current_node[0] === ending_coords[0] && current_node[1] === ending_coords[1]){
                return renderFinalPath(current_path, animation_seq)
            }

            // Ensure that we are not overwriting the starting node
            if (!(current_node[0] === starting_coords[0] && current_node[1] === starting_coords[1])){
                animation_seq.push(new PathAnimation('visited', current_node[0], current_node[1]))
            }

            let neighbors = gridMap[current_node]
            for (let i = 0; i < neighbors.length; i++){
                const [neighborRow, neighborCol] = neighbors[i]
                if (!(visited[neighborRow][neighborCol])){
                    let new_path = [...current_path, neighbors[i]]
                    queue.push(new_path)
                    visited[neighborRow][neighborCol] = true
                }
            }

        }
    }

    return animation_seq

}

function DFS(gridState){
    console.log('DFS called')
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

export function constructBoundaryPrefix( gridState ){

    const { rows, cols, starting_coords, ending_coords } = gridState
    const sequence_prefix = []
    
    // remove existing starting & goal
    sequence_prefix.push(new PathAnimation('w0_unvisited', starting_coords[0], starting_coords[1]))
    sequence_prefix.push(new PathAnimation('w0_unvisited', ending_coords[0], ending_coords[1]))
    
    // add new starting and goal nodes
    sequence_prefix.push(new PathAnimation('start', 1, 0))
    sequence_prefix.push(new PathAnimation('goal', rows - 2, cols - 1))

    // add border boundary - top & bottom walls
    for (let i = 0; i < cols; i++){
        sequence_prefix.push(new PathAnimation('boundary', 0, i))
        sequence_prefix.push(new PathAnimation('boundary', rows - 1, cols - 1 - i))
    }

    // add border boundary - side walls 
    for (let i = 0; i < rows; i++){
        if (i === 1){
            continue
        }
        sequence_prefix.push(new PathAnimation('boundary', i, 0))
        sequence_prefix.push(new PathAnimation('boundary', rows - 1 - i, cols - 1))
    }
    return sequence_prefix
}

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
                    animation_sequence.push(new PathAnimation('boundary', barrier_row, i))
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
                    animation_sequence.push(new PathAnimation('boundary', i, barrier_col))
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

