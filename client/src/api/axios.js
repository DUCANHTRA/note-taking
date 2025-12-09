import axios from "axios";
import logger from "../utils/logger";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Request interceptor - Add token and log requests
axiosInstance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("auth-storage"))?.state?.user;
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }

        // Log API request
        logger.api.request(
            "[APIRequest]",
            config.method,
            config.url,
            config.data
        );

        return config;
    },
    (error) => {
        logger.error("[APIRequest]", "Request interceptor error", error);
        return Promise.reject(error);
    }
);

// Response interceptor - Log responses and handle errors
axiosInstance.interceptors.response.use(
    (response) => {
        // Log successful response
        logger.api.response(
            "[APIResponse]",
            response.config.method,
            response.config.url,
            response.status,
            response.data
        );

        return response;
    },
    (error) => {
        // Log error response
        const status = error.response?.status;
        const url = error.config?.url;
        const method = error.config?.method;

        logger.error(
            "[APIResponse]",
            `API Error: ${method?.toUpperCase()} ${url} [${status || "Network Error"}]`,
            error
        );

        // Handle specific error cases
        if (status === 401) {
            logger.warn("[APIResponse]", "Unauthorized - Token may be expired", {
                url,
                method,
            });
            // Clear auth storage on 401
            localStorage.removeItem("auth-storage");
            window.location.reload();
        } else if (status === 403) {
            logger.warn("[APIResponse]", "Forbidden - Access denied", {
                url,
                method,
            });
        } else if (status === 404) {
            logger.warn("[APIResponse]", "Resource not found", {
                url,
                method,
            });
        } else if (status >= 500) {
            logger.error("[APIResponse]", "Server error", {
                url,
                method,
                status,
            });
        } else if (!error.response) {
            logger.error("[APIResponse]", "Network error - No response from server", {
                url,
                method,
                message: error.message,
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;