import axios from 'axios';
import { LeetCodeQuestionModel } from '../../../data/LeetCodeQuestionModel';


const backendHost = process.env.BACKEND_HOST || 'http://localhost:8080';





export interface QuestionState {
    id: number;
    url: string;
    title: string;
    difficulty: string;
    category: string;
    next_review: string
    owner_id: number;
}

function getProblemNameFromUrl(url:string) {
    const urlParts = url.split('/');
    const problemIndex = urlParts.indexOf('problems');
    const problemName = urlParts[problemIndex + 1];
    const problemNameCapitalized = problemName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return problemNameCapitalized;
  }
  

const get_next_review_long = (review_in:string)=>{
    if(review_in === "never"){
        return null
    }
    const today = new Date();
    const next_review_date = new Date(today);
    next_review_date.setDate(next_review_date.getDate() + parseInt(review_in));
    console.log(next_review_date.toDateString())
    return next_review_date.getTime();
}

export async function addNewQuestion(question:LeetCodeQuestionModel, review_in_days_str:string) {
    try {
        const review_in = review_in_days_str=== "never" ? null : get_next_review_long(review_in_days_str);
        question.owner_id = parseInt(localStorage.getItem("user_id") as string)
        question.title = getProblemNameFromUrl(question.url);
      const response = await axios.post(backendHost+'/api/v1/questions', {
        url: question.url,
        title: question.title,
        difficulty: question.difficulty,
        category: question.category,
        next_review_long: review_in,
        owner_id: question.owner_id
      });
      if (response.status === 201) {
        console.log('question created successfully');
        console.log(response.data)
        return response.data;
      } else{
        alert('Question creation failed');
        return 'Failure';
      }
    } catch (error : any) {
        if(error.response.status === 409){
            alert('Failed to add question.');
        }
      console.error(error.message);
      return 'Failure';
    }
  }
export async function updateQuestion(question:LeetCodeQuestionModel, review_in_days:string) {
    try {
        let review_in = review_in_days === "never" ? null : get_next_review_long(review_in_days);
        review_in = review_in ? Number(review_in) : null;

        const response = await axios.put(backendHost+`/api/v1/questions/update/${question.id}`, {
            url: question.url,
            title: question.title,
            difficulty: question.difficulty,
            category: question.category,
            next_review_long: review_in,
            owner_id: question.owner_id
          });

        if (response.status === 200) {
            console.log('Question updated successfully');
            return response.data;
        } else {
            console.error('Question update failed');
            return 'Failure';
        }
    } catch (error: any) {
        console.error(error.message);
        return 'Failure';
    }
}

export async function deleteQuestion(id:number) {
    try {
        const response = await axios.delete(backendHost+`/api/v1/questions/${id}`);
        if (response.status === 200) {
            console.log('Question deleted successfully');
            return response.data;
        } else {
            console.error('Question delete failed');
            return 'Failure';
        }
    } catch (error: any) {
        console.error(error.message);
        return 'Failure';
    }
}



export const get_next_review_string = (isoString: string | null) => {
    if (isoString === null) {
      return "Never";
    }
  
    const date = new Date(isoString);
    const today = new Date();
  
    // Remove time parts of today's date
    today.setHours(0, 0, 0, 0);
  
    if (date < today) {
      return "Over due";
    }
  
    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      return "Today";
    }
  
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    if (
      date.getFullYear() === tomorrow.getFullYear() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getDate() === tomorrow.getDate()
    ) {
      return "Tomorrow";
    }
  
    // Calculate the difference in days
    const diffInTime = date.getTime() - today.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
  
    return `In ${diffInDays} days`;
  };

