export interface LeetCodeQuestionModel {
    id: number;
    name: string;
    url: string;
    category: string;
    deck_id: number;
    tags: string[];
    date_created: Date;
    last_completion: Date;
    difficulty: "Easy" | "Medium" | "Hard";
    next_review: Date;
}