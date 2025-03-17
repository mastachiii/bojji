export default function ProfileButton({ handler, label }) {
    return <button onClick={handler}>{label}</button>;
}
