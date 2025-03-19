export default function EditProfileField({ value, handler, label }) {
    return (
        <div >
            <h1 className="font-semibold text-sm">{label}</h1>
            <input type="text" value={value} maxLength={30} onChange={e => handler(e.target.value)} className="w-[60%] p-2 mt-2 text-sm border-1 border-zinc-200 focus:border-black outline-0 rounded-md"/>
        </div>
    );
}