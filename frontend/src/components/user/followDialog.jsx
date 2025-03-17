import { useState } from "react";

export default function FollowDialog({ follows, ref, user }) {
    function handleInteraction({ username, following }) {}

    return (
        <dialog ref={ref} open={true}>
            {follows.map(f => {
                const isFollowing = user.following.find(u => u.id === f.id);

                return (
                    <div>
                        <img src={f.profilePicture} className="" />
                        <p>{f.username}</p>
                        <button>following</button>
                    </div>
                );
            })}
        </dialog>
    );
}
