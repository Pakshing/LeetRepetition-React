// create a function that takes a string, category (like leetcode different tags) and returns a color

export const tagColors = (tag: string) => {
    if(tag.toUpperCase() === 'ARRAY') return 'geekblue';
    if(tag.toUpperCase() === 'STRING') return 'green';
    if(tag.toUpperCase() === 'LINKED_LIST') return 'volcano';
    if(tag.toUpperCase() === 'HASHING') return 'orange';
    if(tag.toUpperCase() === 'HEAP') return 'gold';
    if(tag.toUpperCase() === 'SLIDING_WINDOW') return 'cyan';
    if(tag.toUpperCase() === 'STACK&QUEUE') return 'purple';
    if(tag.toUpperCase() === 'TREE') return 'magenta';
    if(tag.toUpperCase() === 'GRAPH') return 'lime';
    if(tag.toUpperCase() === 'DP') return 'blue';
    if(tag.toUpperCase() === 'GREEDY') return 'red';
    if(tag.toUpperCase() === 'SORTING') return 'yellow';
    if(tag.toUpperCase() === 'BACKTRACKING') return 'gold';

    return 'geekblue';
};

export const difficultyColors = (difficulty: string) => {
    if(difficulty.toLowerCase() === 'easy') return 'green';
    if(difficulty.toLowerCase() === 'medium') return 'orange';
    if(difficulty.toLowerCase() === 'hard') return 'red';

    return 'green';
}