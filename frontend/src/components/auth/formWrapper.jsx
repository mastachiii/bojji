import { Link } from "react-router";
import { RotatingLines } from "react-loader-spinner";

export default function FormWrapper({ children, label, btnActiveStatus, btnLabel, btnHandler, redirectLink }) {
    return (
        <>
            <div className="w-full h-screen flex flex-col bg-stone-950 font-sans text-white">
                <div className="w-full flex flex-col items-center gap-13 pt-[50%] md:pt-8 md:pb-8 md:mt-[10%] md:w-[20%] md:ml-auto md:mr-auto md:border-1 md:border-zinc-600">
                    <h1 className="font-[Pacifico] text-[2.8rem] text-white md:text-[2.2rem]">Bojji</h1>
                    {children}
                    <button
                        className="w-[80%] flex justify-center mt-2 p-2 bg-sky-500 rounded-md text-sm font-semibold cursor-pointer hover:bg-sky-800"
                        // disabled={btnActiveStatus}
                        onClick={btnHandler}
                    >
                        {!btnActiveStatus ? btnLabel : <RotatingLines strokeColor="white" width="20" />}
                    </button>
                </div>
                <span className="w-full flex justify-center gap-1 p-5 mt-auto mb-2 text-xs border-t-1 border-zinc-500 md:w-[20%]  md:self-center md:mt-4 md:border-1 md:border-zinc-600">
                    <p>Don't have an account? </p>
                    <Link to={redirectLink} className="text-sky-500 font-semibold">
                        {label}
                    </Link>
                </span>
            </div>
        </>
    );
}
