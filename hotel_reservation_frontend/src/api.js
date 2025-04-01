// src/api.js
export const apiUrl = "http://localhost:5000"; // Change to your backend URL if needed

export async function fetchCustomers() {
    const token = localStorage.getItem("token"); // Retrieve token from storage

    const response = await fetch(`${apiUrl}/customers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include token in the request
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch customers");
    }

    return await response.json();
}
