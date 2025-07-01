import { useState } from "react";


export const getQuestionsBySub = async (subjectId) => {

    try {
        console.log("subjectId in getQuestionsBySub", subjectId)
        const questions = await fetch(`http://localhost:8080/questions/getall/${subjectId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        console.log("questions ", questions)
        return questions.json();

        //   res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return { message: 'Internal Server Error' };
        // res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getQuestionByQID = async (qid) => {
    try {
        console.log("subjectId in getQuestionByQID qid ", qid);
        const response = await fetch(`http://localhost:8080/questions/get/${qid}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const question = await response.json(); 
        console.log("Parsed question data:", question);
        return question;

    } catch (error) {
        console.error('Error fetching question:', error);
        return { message: 'Internal Server Error' };
    }
};
