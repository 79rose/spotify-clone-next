import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
interface ButtomProps extends React.HTMLAttributes<HTMLButtonElement>{}

const Buttom = forwardRef<HTMLButtonElement, ButtomProps>(({
    className,
    children,
    disabled,
    type="button",
    ...props
}, ref) => {
    return (
        <button
            type={type}
            className={twMerge(`
    w-full rounded-full bg-green-500 border px-3 py-3 border-transparent disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition
        `, className)}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
})

Buttom.displayName = 'Button';
export default Buttom;