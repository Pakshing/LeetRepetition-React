// create a function that takes a string, category (like leetcode different tags) and returns a color

export const tagColors = (tag: string) => {
    if(tag.toLowerCase() === 'array') return 'geekblue';
    if(tag.toLowerCase() === 'string') return 'green';
    if(tag.toLowerCase() === 'linkedlist') return 'volcano';
    if(tag.toLowerCase() === 'tree') return 'orange';
    if(tag.toLowerCase() === 'graph') return 'gold';
    if(tag.toLowerCase() === 'dynamic programming') return 'cyan';
    if(tag.toLowerCase() === 'backtracking') return 'purple';
    if(tag.toLowerCase() === 'math') return 'magenta';
    if(tag.toLowerCase() === 'bit manipulation') return 'lime';
    if(tag.toLowerCase() === 'greedy') return 'blue';
    if(tag.toLowerCase() === 'stack') return 'red';
    if(tag.toLowerCase() === 'queue') return 'yellow';
    if(tag.toLowerCase() === 'heap') return 'gold';
    if(tag.toLowerCase() === 'sort') return 'cyan';
    if(tag.toLowerCase() === 'binary search') return 'purple';
    if(tag.toLowerCase() === 'hash table') return 'magenta';
    if(tag.toLowerCase() === 'two pointers') return 'lime';

    return 'geekblue';
};


export const difficultyColors = (difficulty: string) => {
    if(difficulty.toLowerCase() === 'easy') return 'green';
    if(difficulty.toLowerCase() === 'medium') return 'orange';
    if(difficulty.toLowerCase() === 'hard') return 'red';

    return 'green';
}