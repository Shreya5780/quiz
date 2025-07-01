// Define a simple User class if not imported from elsewhere
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export const getAllUsers = async () => {
    let users = [];
    try {
        users.push(new User("1", "John Doe"));
        users.push(new User("2", "Jane Smith"));
        users.push(new User("3", "Alice Johnson"));
        users.push(new User("het", "het"));
     

    } catch (error) {
        console.error("Error fetching users:", error);
    }
    return users;
}