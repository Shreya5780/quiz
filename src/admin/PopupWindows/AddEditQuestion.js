import { useParams } from "react-router-dom";

function AddEditQuestion() {

    const {subjectId} = useParams();

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const questionData = {
            question: formData.get('question'),
            option1: formData.get('option1'),       
            option2: formData.get('option2'),
            option3: formData.get('option3'),
            option4: formData.get('option4'),
            correctAnswer: formData.get('answer'),
            subjectId: subjectId
        };

        fetch(`http://localhost:8080/questions/add/${subjectId}`, {
            method: 'POST',
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
            console.log('Question added successfully:', data);
            window.close(); 
        })
        .catch(error => {
            console.error('Error adding question:', error);
            alert('Failed to add question. Please try again.');
        });
    }

    return (
        <div className="popup-window">
            <h2>Add/Edit Question</h2>
            <form onSubmit={handleSubmit}>  
                <input type="text" name="question" placeholder="Question" required />
                <input type="text" name="option1" placeholder="Option A" required />
                <input type="text" name="option2" placeholder="Option B" required />
                <input type="text" name="option3" placeholder="Option C" required />
                <input type="text" name="option4" placeholder="Option D" required />
                <input type="text" name="answer" placeholder="Correct Answer" required />
                <button type="submit">Save Question</button>
            </form>
            <button className="close-button" onClick={() => window.close()}>Close</button>
        </div>
    );
}
export default AddEditQuestion;