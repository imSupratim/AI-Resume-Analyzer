import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-resume-analyzer-kkhk.onrender.com"+"/api";  
});

export default api;
