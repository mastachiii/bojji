import { Link } from "react-router";
import { RotatingLines } from "react-loader-spinner";
import userApi from "../../helpers/userApi";

export default function FormWrapper({ children, label, btnStatus, btnLabel, btnHandler, redirectLink, type }) {
    return (
        <>
            <div className="w-full h-screen flex flex-col bg-stone-950 font-sans text-white">
                <div className="w-full flex flex-col items-center gap-13 pt-[50%] md:pt-8 md:pb-8 md:mt-[10%] md:w-[20%] md:ml-auto md:mr-auto md:border-1 md:border-zinc-600">
                    <h1 className="font-[Pacifico] text-[2.8rem] text-white md:text-[2.2rem]">Bojji</h1>
                    {children}
                    <div className="w-[80%]">
                        <button
                            className="w-full flex justify-center mt-2 p-2 bg-sky-500 rounded-md text-sm font-semibold cursor-pointer hover:bg-sky-800"
                            // disabled={btnActiveStatus}
                            onClick={btnHandler}
                        >
                            {btnStatus !== "LOGGING IN" ? btnLabel : <RotatingLines strokeColor="white" width="20" />}
                        </button>
                        {type === "logIn" && (
                            <button
                                onClick={e => btnHandler(e, "guest")}
                                className="w-full flex justify-center p-2 mt-2 rounded-md text-sm text-center font-semibold bg-sky-500 cursor-pointer hover:bg-sky-700"
                            >
                                {btnStatus !== "GUEST LOGGING IN" ? "Use Guest Account" : <RotatingLines strokeColor="white" width="20" />}
                            </button>
                        )}
                    </div>
                </div>
                <span className="w-full flex justify-center gap-1 p-5 mt-auto mb-2 text-xs border-t-1 border-zinc-500 md:w-[20%]  md:self-center md:mt-4 md:border-1 md:border-zinc-600">
                    <p>{type === "logIn" ? "Don't have an account?" : "Already have an account?"} </p>
                    <Link to={redirectLink} className="text-sky-500 font-semibold">
                        {label}
                    </Link>
                </span>
            </div>
        </>
    );
}
