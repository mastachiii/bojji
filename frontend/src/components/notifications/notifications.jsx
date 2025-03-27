import cancel from "../../assets/cancel.svg";

export default function Notification({ ref, notifications = [] }) {
    return (
        <dialog ref={ref} className="min-h-screen min-w-screen md:min-w-[30%] md:min-h-[50%] md:max-h-[50%]  md:m-auto md:rounded-xl">
            <span className="sticky top-1 flex pt-2 pb-4 border-b-1 border-neutral-200 ">
                <p className="w-[100%] mt-1 font-semibold text-center">Notifications</p>
                <button onClick={() => ref.current.close()} className="absolute right-2 cursor-pointer">
                    <img src={cancel} className="size-8" />
                </button>
            </span>
            <div className="flex flex-col gap-4 mt-4">
                {notifications.map(n => {
                    return (
                        <div className="flex gap-4 pl-4 pr-4">
                            <img src={n.user.profilePicture} className="size-12 rounded-full" />
                            <span className="text-sm">
                                <p>
                                    <b className="font-semibold">{n.user.username}</b> liked your post.
                                </p>
                                <p className="text-xs text-neutral-600">{new Date(n.createdAt).toLocaleDateString()}</p>
                            </span>
                            <img src={n.post.images[0]} className="size-12 ml-auto" />
                        </div>
                    );
                })}
            </div>
        </dialog>
    );
}
