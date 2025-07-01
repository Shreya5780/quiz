import { useState } from "react";


export const getQuestionsBySub = async (subjectId) => {

    try {
        const questions = await fetch(`http://localhost:8080/questions/getall/${subjectId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
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
        return question;

    } catch (error) {
        console.error('Error fetching question:', error);
        return { message: 'Internal Server Error' };
    }
};
