"use client";

type DifficultyProps = {
    number: number;
    setNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function Difficulty({ number, setNumber }: DifficultyProps) {
    const badges: string[] = ["3", "4", "5", "6", "7", "8"];

    const setDifficulty = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = Number(e.currentTarget.innerText);
        setNumber(value);
    };
    return (
        <div className="flex flex-col items-start min-w-fit">
            <div className="text-lg font-extrabold text-center">
                Difficulty:
            </div>
            <div className="border-1 rounded-md border-gray-800 flex flex-wrap py-1 px-2">
                {badges.map((badge, index) => {
                    const isSelected = number === Number(badge);
                    return (
                        <button
                            key={index}
                            onClick={setDifficulty}
                            aria-label={`Badge ${badge}`}
                            className={`rounded-md px-3 py-1 mx-2 cursor-pointer transition-all
                                ${isSelected ? "bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-400 text-gray-900"}`}
                        >
                            {badge}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
