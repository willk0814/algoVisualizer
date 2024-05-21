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
    // define a weight map
    const weight_map = {
        0: 0, 
        1: 0, 
        2: 0, 
        3: 1, 
        4: 2, 
        5: 3, 
    }

    // generate a grid
    const tmpGrid = [];
    for (let i = 0; i < rows; i++) {
        const tmpRow = [];
        for (let j = 0; j < columns; j++) {
            if (weighted) {
                tmpRow.push(`w${weight_map[Math.floor(Math.random() * 4) + 2]}_unvisited`);
            } else {
                tmpRow.push('w0_unvisited');
            }
        }
        tmpGrid.push(tmpRow);
    }

    const starting_coords = generatestarting_coords(rows, columns)
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
function generatestarting_coords(rows, cols){
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
        'w1_unvisited': 10,
        'w2_unvisited': 50,
        'w3_unvisited': 1000,
    }

    for (let i = 0; i < rows; i++){
        for (let j = 0; j < cols; j++){
            let connections = []
            
            
            // check cell below
            if (i < rows - 1 && grid[i + 1][j] !== 'boundary'){
                if (weighted){
                    connections.push([[i + 1, j], weightMap[grid[i + 1][j]]])
                } else {
                    connections.push([i + 1, j])
                }
            }
            
            // check cell above
            if (i > 0 && grid[i - 1][j] !== 'boundary'){
                if (weighted){
                    connections.push([[i - 1, j], weightMap[grid[i - 1][j]]])
                } else {
                    connections.push([i - 1, j])
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
        animation_sequence = Dijikstra(gridState)
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
    
    const { grid, gridMap, starting_coords, ending_coords, rows, columns, weighted } = gridState

    // Construct a visited array
    const visited = Array.from({ length: rows }, () => Array(columns).fill(false))
    const parents = {}

    // return animation_sequence
    let animation_seq = []


    let stack = []
    stack.push(starting_coords)
    visited[starting_coords[0]][starting_coords[1]] = true

    while (stack.length > 0){
        const current = stack.pop()

        if (current[0] === ending_coords[0] && current[1] === ending_coords[1]){
            break
        }

        animation_seq.push(new PathAnimation('visited', current[0], current[1]))
        const neighbors = gridMap[current]
        for (const neighbor of neighbors){

            console.log(visited)
            if (!(visited[neighbor[0]][neighbor[1]])){
                stack.push(neighbor)
                visited[neighbor[0]][neighbor[1]] = true
                parents[`${neighbor[0]}: ${neighbor[1]}`] = current;
            }
        }
    }

    let final_path = []
    let current = ending_coords
    while (current !== undefined){
        final_path.unshift(current);
        current = parents[`${current[0]}: ${current[1]}`]
    }

    for (let i = 1; i < final_path.length; i++ ){
        animation_seq.push(new PathAnimation('goal', final_path[i][0], final_path[i][1]))
    }

    return animation_seq
    
}

function Dijikstra(gridState){
    const { grid, gridMap, rows, columns, starting_coords, ending_coords } = gridState
    const visited = Array.from({ length: rows }, () => Array(columns).fill(false)) 

    // declare return object
    let animation_seq = []

    // track distances from the starts & optimized parents
    let parents = {}
    let distances = {}

    // Update the distances to endingCoord and parent
    distances[ending_coords] = Number.POSITIVE_INFINITY
    parents[starting_coords] = null

    // Find possible connections from gridMap
    const neighbors = gridMap[starting_coords]
    for (const [node, cost] of neighbors){
        distances[node] = cost
        parents[node] = starting_coords
    }

    let node_str = findShortestDistanceNode(distances, visited)

    while(node_str){
        let node_arr = node_str.split(",").map((element) => parseInt(element))

        // generate an animation to show that we have visited
        animation_seq.push(new PathAnimation('visited', node_arr[0], node_arr[1]))

        const distance = distances[node_str]
        const children = gridMap[node_str]

        for (const [child, cost] of children){
            // check to see if the child is the starting node
            if (child[0] === starting_coords[0] && child[1] === starting_coords[1]){
                continue

            // check to see if child is ending node
            } else if (child[0] === ending_coords[0] && child[1] === ending_coords[1]){
                parents[child] = node_arr
                return constructFinalPath(starting_coords, ending_coords, parents, animation_seq)
            
            // otherwise recurse to shortest distance node
            } else {
                // find the distance to our current position
                const newDistance = distance + cost

                // update the distance if it is shorter than stored distance
                if (!visited[child[0]][child[1]] && 
                    !(distances[child] || distances[child] > newDistance)){
                    distances[child] = newDistance
                    parents[child] = node_arr
                }
            }
        }

        visited[node_arr[0]][node_arr[1]] = true
        node_str = shortestDistanceNode(distances, visited)
    }
    return animation_seq;
}

function shortestDistanceNode(distances, visited) {
    let shortest = null

    for (const [node, distance] of Object.entries(distances)) {
        const [row, col] = node.split(",").map((element) => parseInt(element));
        if (!visited[row][col] &&
            (distance < distances[shortest] || shortest == null)){
                shortest = node
            }
    }
    return shortest
}

function constructFinalPath(starting_coords, ending_coords, parents, animation_seq) {
    const path = []; // Array to store the final path
  
    // Begin from the ending_coords
    let currentCoords = ending_coords;

    while (!(currentCoords[0] === starting_coords[0] && currentCoords[1] === starting_coords[1]) &&
        !path.includes(currentCoords)){
        // add current coordinates to the path
        path.push(currentCoords)
        // reassign currentCoords to the current nodes parents
        currentCoords = parents[currentCoords.join(',')] 
    }
    
    path.reverse(); // Reverse the path to get the correct order

    // Add Animation objects for the final path
    for (const [row, col] of path) {
      animation_seq.push(new PathAnimation("goal", row, col));
    }
    
    return animation_seq; // Return the updated array of Animation objects
  }

// helper function to find the shortest distance node from where we are
function findShortestDistanceNode(distances, visited){
    let shortest = null

    for (const [node, distance] of Object.entries(distances)){
        const [row, col] = node.split(",").map((element) => parseInt(element))
        if (!visited[row][col] &&
            (distance < distances[shortest] || shortest === null )){
                shortest = node
            }
    }
    return shortest
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

