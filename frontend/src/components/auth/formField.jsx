export default function FormField({ id, label, type, value, valueHandler }) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input type={type} value={value} onChange={e => valueHandler(e.target.value)} name={id} id={id} />
        </>
    );
}
