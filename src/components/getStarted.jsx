import LoginPopup from "./sigin"
import imBg from "../assets/images/im.webp"
const GetStarted = () => {
    return (
        <div className="bg-black/10 w-full flex flex-col lg:flex-row justify-center items-center">
            <div className="w-full lg:w-1/3 flex justify-center lg:justify-end items-center p-2 py-4">
                <LoginPopup />
            </div>
            <div className="w-full lg:w-2/3 flex flex-row-reverse justify-end items-center">
                <img 
                    src={imBg} 
                    className="w-full lg:w-[850px] lg:h-[540px] object-cover" 
                    alt="Background" 
                />
            </div>
        </div>
    );
};


export default GetStarted;
