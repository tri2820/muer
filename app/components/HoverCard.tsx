export default function HoverCard({ children, className }: any) {
    return <div className="flex group/cell justify-center">
        <div className="flex-none w-2" />

        <div className="overflow-x-auto w-full md:w-2/3 max-w-xl my-2">
            {/* <div className="flex items-center invisible group-hover/cell:visible p-1 text-gray-500 hover:text-gray-900 group/header" /> */}

            <div className={`overflow-y-auto ${className}`}>
                {children}
            </div>

        </div>

        <div className="flex-none w-2" />
    </div>
}