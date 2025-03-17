import camera from "../../assets/camera.svg";

export default function EmptyPosts() {
    return (
        <div className="w-screen pt-20 flex flex-col justify-center items-center">
            <img src={camera} className="size-20"/>
            <p className="font-semibold">No Posts Yet</p>
        </div>
    );
}
