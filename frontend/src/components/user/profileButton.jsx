export default function ProfileButton({ handler, label }) {
    return <button onClick={handler} className="p-3 pt-1 pb-1 rounded-md text-xs font-semibold bg-neutral-200 cursor-pointer hover:bg-neutral-400">{label}</button>;
}
