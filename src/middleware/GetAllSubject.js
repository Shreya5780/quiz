import { useState } from "react";


export const getAllSubject = async (req, res) => {
    
    try {
        const subjects = await   fetch(`http://localhost:8080/admin/getall`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
    //   console.log("subjects", subjects)
      return subjects.json();
        
    //   res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}