export const getscoreBySub = async (subjectId) => {
    try {
        console.log("subjectId in getscoreBySub", subjectId);

        const response = await fetch(`http://localhost:8080/score/getbysub/${subjectId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
           
        });

        if (!response.ok) {
            throw new Error("Failed to save score");
        }
        
        const result = await response.json();
        console.log("Score received:", result);
        return result; // Return the result for further processing if needed
        
    } catch (error) {
        console.error("Error saving score:", error);
    }
}

export const getscoreByUser = async (userId) => {
    try {
        console.log("subjectId in getscoreBySub", userId);

        const response = await fetch(`http://localhost:8080/score/getbyuser/${userId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
           
        });

        if (!response.ok) {
            throw new Error("Failed to save score");
        }
        
        const result = await response.json();
        console.log("Score received:", result);
        return result; // Return the result for further processing if needed
        
    } catch (error) {
        console.error("Error saving score:", error);
    }
}

