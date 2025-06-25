import { useState } from "react";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";

function AddEditQuestion() {

    const navigate = useNavigate();
    const { subjectId } = useParams();

    const location = useLocation();
    const { question } = location.state || { question: {} };
    console.log("question", question);


    const initialFormData = {
        // qid: question.qid || '',
        question: question.question || '',
        option1: question.option1 || '',
        option2: question.option2 || '',
        option3: question.option3 || '',
        option4: question.option4 || '',
        answer: question.answer || '',
        subjectId: subjectId || ''
    };

    const [questionData, setQuestionData] = useState(initialFormData);

    const handleSubmit = (event) => {
        event.preventDefault();
        // const formData = new FormData(event.target);
        // questionData = {
        //     question: formData.get('question'),
        //     option1: formData.get('option1'),       
        //     option2: formData.get('option2'),
        //     option3: formData.get('option3'),
        //     option4: formData.get('option4'),
        //     answer: formData.get('answer'),
        //     subjectId: subjectId
        // };

        let url = `http://localhost:8080/questions/add/${subjectId}`;

        if (question.qid != null) {
            url = `http://localhost:8080/questions/update/${question.qid}`;
        }

        fetch(url, {
            method: question.qid != null ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Question updated successfully:', data);
                navigate(`/questions/${subjectId}`);
                // window.close();
            })
            .catch(error => {
                console.error('Error updating question:', error);
                alert('Failed to update question. Please try again.');
            });
    }

    return (
        <div className="popup-window">
            <h2>Add/Edit Question</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="question" placeholder="Question" value={questionData.question} required onChange={e => setQuestionData({ ...questionData, question: e.target.value })} />

                <input type="text" name="option1" placeholder="Option A" value={questionData.option1} required onChange={e => setQuestionData({ ...questionData, option1: e.target.value })} />
                <input type="text" name="option2" placeholder="Option B" value={questionData.option2} required onChange={e => setQuestionData({ ...questionData, option2: e.target.value })} />
                <input type="text" name="option3" placeholder="Option C" value={questionData.option3} required onChange={e => setQuestionData({ ...questionData, option3: e.target.value })} />
                <input type="text" name="option4" placeholder="Option D" value={questionData.option4} required onChange={e => setQuestionData({ ...questionData, option4: e.target.value })} />
                <input type="text" name="answer" placeholder="Correct Answer" value={questionData.answer} required onChange={e => setQuestionData({ ...questionData, answer: e.target.value })} />
                <button type="submit">Save Question</button>
            </form>
            <button className="close-button" onClick={() => navigate(`/questions/${subjectId}`)}>Close</button>
        </div>
    );
}
export default AddEditQuestion;