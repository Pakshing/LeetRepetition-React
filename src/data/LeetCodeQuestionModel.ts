export interface LeetCodeQuestionModel {
    id: number;
    title: string;
    url: string;
    //category: string;
    owner_id: number;
    tags: string[];
    date_created: Date;
    last_completion: Date;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    review_date: Date|null;
    
}