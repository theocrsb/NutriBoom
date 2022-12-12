import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <h1> Page not found</h1>
            <img src=".assets/carotte triste" alt="carotte triste" />
            <h3>This URL is not correct </h3>
            <Link to="/">Back to home page</Link>
        </div>
    )
}

export default Page404;