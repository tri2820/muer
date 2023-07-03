
export default function Card({ title, children, level = 0 }: any) {
    const titleStyle = level == 0 ? 'text-2xl font-bold' : 'text-lg font-bold';
    const subGroupModifier = level == 0 ? '' : `/${level}`

    return <div className={`group${subGroupModifier} flex ml-${level}`}>

        <div className={`flex-none bg-gray-200 w-2 rounded my-2 invisible group-hover${subGroupModifier}:visible`} />

        <div className="py-2 px-4 space-y-1">
            <div className="flex items-center">
                <p className={`text-gray-800 ${titleStyle}`}>{title}</p>
                {/* {
                    notCollapsible || <div className="ml-1 invisible group-hover:visible hover:bg-gray-200 p-1 rounded">
                        <div className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>

                        </div>
                    </div>
                } */}

            </div>


            <div>
                {children}
            </div>
        </div>
    </div>
}