

const TestPage = () => {
    return ( 
        <div className="bg-rose-500 h-full flex flex-col pb-4">
            <div>
                stickey
            </div>
            <div className="flex-1 bg-blue-700 p-4 gap-2 overflow-y-auto">
                {Array.from({ length: 30 }).map((_,i) => (
                    <div 
                        key={i}
                        className="mt-2 bg-neutral-700 h-[200px]"
                    />
                ))}
            </div>
            <div className="">
                sticky
            </div>
        </div>
    );
};
 
export default TestPage;