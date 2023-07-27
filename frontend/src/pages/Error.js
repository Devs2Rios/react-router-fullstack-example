import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function NotFound() {
    const error = useRouteError(),
        handleError = (statusCode, errorMessage) => {
            let title, message;
            switch (statusCode) {
                case 401:
                    title = "Unauthorized";
                    message = "You are not authorized to access this resource!";
                    break;
                case 403:
                    title = "Forbidden";
                    message = "You are not allowed to access this resource!";
                    break;
                case 404:
                    title = "Not Found";
                    message = "The requested resource was not found!";
                    break;
                case 500:
                    title = "Internal Server Error";
                    message = "We couldn't complete your request!";
                    break;
                default:
                    title = "An Error Occurred";
                    message = "Something went wrong!";
                    break;
            }
            return { title, message: errorMessage ?? message };
        };

    const { title, message } = handleError(error.status, error.data.message);

    return (
        <>
            <MainNavigation />
            <main style={{
                padding: '1rem 1rem 2rem',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1>{title}</h1>
                <p>{message}</p>
            </main>
        </>
    );
}