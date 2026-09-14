import { useRouteError } from "react-router";
const Error = () => {
    const err = useRouteError();
    console.log(err);
    return (
        <div className="error-page">
            <h3>{err.status} {err.statusText} - {err.data}</h3>
        </div>
    )
}

export default Error;