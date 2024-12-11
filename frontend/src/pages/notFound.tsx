import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

function NotFound(){
    return (
        <div className="fixed w-full h-full flex flex-col items-center content-center content-center justify-center">
            <h1 className="text-5xl mb-10">Error 404: Page not Found</h1>
            <Link className="text-3xl text-sky-500" to={"/"}>
                <div className="flex flex-row items-center w-82 h-15 bg-red-150">
                    <FaArrowLeft/>
                    <h2 className="p-2">Back to Trump Thoughts</h2>
                </div>
            </Link>
        </div>
    )
}
export default NotFound