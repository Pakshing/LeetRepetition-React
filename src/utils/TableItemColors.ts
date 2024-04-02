// create a function that takes a string, category (like leetcode different tags) and returns a color

export const tagColors = (tag: string) => {
    if(tag === 'Array') return 'geekblue';
    if(tag === 'String') return 'green';
    if(tag === 'Linked List') return 'volcano';
    if(tag === 'Recursion') return 'orange';
    if(tag === 'Map/Set') return 'gold';
    if(tag === 'Binary Search') return 'cyan';
    if(tag === 'Heap/Priority Queue') return 'purple';
    if(tag === 'Sliding Window') return 'magenta';
    if(tag === 'Stack/Queue') return 'lime';
    if(tag === 'Tree') return 'blue';
    if(tag === 'Graph') return 'gray';
    if(tag === 'Dynamic Programming') return 'yellow';
    if(tag === 'Greedy') return 'red';
    if(tag === 'Sorting') return 'pink';
    if(tag === 'Backtracking') return 'teal';
    if(tag === 'Intervals') return 'cornflowerblue';
    if(tag === 'MATH&Math & Geometry') return 'darkcyan';
    if(tag === 'Bit Manipulation') return 'brown';

    return 'geekblue';
};

export const difficultyColors = (difficulty: string) => {
    if(difficulty.toLowerCase() === 'easy') return 'green';
    if(difficulty.toLowerCase() === 'medium') return 'orange';
    if(difficulty.toLowerCase() === 'hard') return 'red';

    return 'green';
}
