export default function EditProfileField({ value, handler, label }) {
    return (
        <div>
            <h1>{label}</h1>
            <input type="text" value={value} onChange={e => handler(e.target.value)} />
        </div>
    );
}
