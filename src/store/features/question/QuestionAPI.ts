import axios from 'axios';
import { LeetCodeQuestionModel } from '../../../data/LeetCodeQuestionModel';
import Cookies from 'js-cookie';


const backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080';





export interface QuestionState {
    id: number;
    url: string;
    title: string;
    difficulty: string;
    category: string;
    next_review: string
    owner_id: number;
}

function getProblemNameFromUrl(url:string) : string{
    const urlParts = url.split('/');
    const problemIndex = urlParts.indexOf('problems');
    const problemName = urlParts[problemIndex + 1];
    const problemNameCapitalized = problemName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return problemNameCapitalized;
  }

export function daysFromTodayStr(review_date: Date | null): string {
  if(review_date === null){
    console.log("return never")
    return "never"
  }else{
    const today = new Date();
    const date = new Date(review_date);

    // Remove time parts of today's date
    today.setHours(0, 0, 0, 0);
  
    // Calculate the difference in days
    const diffInTime = date.getTime() - today.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
    
    return String(diffInDays);
  }
}

export const get_next_review_long = (review_in:string)=>{
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
        const reviewDate = new Date();
        reviewDate.setDate(reviewDate.getDate() + Number(review_in_days_str));
        question.title = getProblemNameFromUrl(question.url);
      const response = await axios.post(backendHost+'/api/v1/questions', {
        url: question.url,
        title: question.title,
        difficulty: question.difficulty,
        tags: question.tags,
        review_date: reviewDate,
      },{
        headers: {
          'Authorization': `Bearer ${Cookies.get("token")}`
        }
      });
    } catch (error : any) {
      console.log(error.response.data.message)
      alert(error.response.data.message)
      return 'Failure';
    }
  }
export async function updateQuestion(question:LeetCodeQuestionModel) {
    try {
        const response = await axios.put(backendHost+`/api/v1/questions/${question.id}`, {
            question: question,
          },{
            headers: {
              'Authorization': `Bearer ${Cookies.get("token")}`
            }
          
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
        const response = await axios.delete(backendHost+`/api/v1/questions/${id}`,{
          headers: {
            'Authorization': `Bearer ${Cookies.get("token")}`
          }
        
        });
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
      // Calculate the difference in days
      const diffInTime = today.getTime() - date.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
      return `Overdue by ${diffInDays} day(s)`;
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
  
    return `In ${diffInDays} day(s)`;
  };

