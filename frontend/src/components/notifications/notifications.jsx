export default function Notification({ ref, notifications }) {
    console.log({ notifications });

    return (
        <dialog ref={ref}>
            <p>notification</p>
            <div>
                {notifications.map(n => {
                    return <div>null</div>;
                })}
            </div>
        </dialog>
    );
}
