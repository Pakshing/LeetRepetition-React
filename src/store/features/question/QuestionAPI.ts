import axios from 'axios';

const backendHost = process.env.BACKEND_HOST || 'http://localhost:8080';



interface QuestionState {
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
  

const next_review_long = (review_in:string)=>{
    if(review_in === "never"){
        return null
    }
    const today = new Date();
    const next_review_date = new Date(today);
    next_review_date.setDate(next_review_date.getDate() + parseInt(review_in));
    console.log(next_review_date.toDateString())
    return next_review_date.getTime();
}

export async function addNewQuestion(question:QuestionState) {
    try {
        const review_in = question.next_review === "never" ? null : next_review_long(question.next_review);
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
            alert('Question already exists');
        }
      console.error(error.message);
      return 'Failure';
    }
  }

