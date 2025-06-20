import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Result() {

    const { subject } = useParams();

    const [result, setResult] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/question/${subject}?answer=A&answer=B&answer=C&answer=D&answer=A`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            // body: 
        })

            .then((response) => response.json())
            .then(data => {
                setResult(data);
                console.log("result, ", data[0])
            })
            .catch((error) => {
                console.log(error)
            })
    }, [subject]);


    useEffect(() => {
        if (!result) {
            return <div>Loading...</div>;
        }
        // if(result){
        //     console.log("result ", result)
        // }else{
        //     <h2>Loading....</h2>
        // }
    }, [result])

    //run this effect when subject change

    return (
        <div>

            <h3>Result:  {result.score} </h3>

            <div>

                {/* {result.map((question, index) =>{
                    <div key={index}>
                        <h1>Result map</h1>
                    <><h4>
                        {question.questions.map((q, i) => {
                            <><h2>Hello</h2><div key={i}>
                                <><span>
                                    {q.questionId}
                                </span>
                                    <span>
                                        {q.question}
                                    </span>
                                    <span>Correct Answer: </span>
                                    <span>
                                        {q.answer}
                                    </span>
                                </>;
                            </div></>
                        })}
                    </h4>
                    <h5>
                        Your Answers: 
                        {question.answer.map((a, i) => {
                            <span key={i}>
                                {a}
                            </span>
                        })}
                    </h5>
                    <h2>
                        {question.score}
                    </h2>
                    </>
                    </div>
                })} */}
            </div>
        </div>
    )
}

export default Result