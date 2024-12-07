"use client"
const classNames = require('classnames');
export default function Input(
    {
        label,
        type,
        name,
        onChange,
        placeholder,
        defaultValue,
        minLength,
        isError = false,
        error = null
    }){

    return (
        <div className={"flex flex-col w-full gap-2"}>
            {
                label && <label htmlFor={name} className={"text-xs font-medium text-slate-600"}>{label}</label>
            }
            <input
                className={classNames({
                    "bg-stone-50 p-2 text-xs font-medium outline-0 focus:ring-2 focus:ring-indigo-600 border rounded-lg": true,
                    "placeholder:text-red-500 focus:border-0 focus:ring-red-500 border-red-500": isError
                })}
                type={type}
                id={name}
                name={name}
                autoComplete={name}
                placeholder={placeholder}
                value={defaultValue}
                min={minLength}
                onChange={onChange}
            />
            { error }
        </div>
    )
}