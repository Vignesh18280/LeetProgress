
export default function Difficulty() {
    const badges: string[] = ["3", "4", "5", "6", "7", "8"];
    return (
        <div className="flex flex-col items-start min-w-fit">
            <div className="text-lg font-extrabold text-center">
                Difficulty: 
            </div>
            <div className="border-1 rounded-md border-gray-800 flex flex-wrap py-1 px-2">
                {badges.map((badge, index) => (
                    <div className="bg-gray-100 hover:bg-gray-400  rounded-md px-3 py-1 mx-2 cursor-pointer" key={index} aria-label={`Badge ${badge}`}>
                        {badge}
                    </div>
                ))}
            </div>
        </div>
    );
};