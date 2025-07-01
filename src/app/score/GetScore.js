export const getscoreBySub = async (subjectId) => {
    try {

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
       const sendData = {  ...result, isUser: false}
        console.log("Score received:", sendData);
        return sendData;
        
    } catch (error) {
        console.error("Error saving score:", error);
    }
}

export const getscoreByUser = async (userId) => {
    try {

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
        const sendData = {  ...result, isUser: true}
        console.log("Score received:", sendData);
        return sendData;
        
    } catch (error) {
        console.error("Error saving score:", error);
    }
}

