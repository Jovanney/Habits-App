import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const sumarryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // weeks

const minimumOfDaysToFill = minimumSummaryDatesSize - sumarryDates.length

export const SummaryTable = () => {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                <div className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                    D
                </div>
                <div className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                    S
                </div>
                <div className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                    T
                </div>
                <div className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                    Q
                </div>
                <div className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                    Q
                </div>
                <div className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                    S
                </div>
                <div className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                    S
                </div>
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {sumarryDates.map(date => {
                    return (
                    <HabitDay 
                        key={date.toString()}    
                        amount={5} 
                        completed={4}                         
                    />)
                })}

                {minimumOfDaysToFill > 0 && Array.from({ length: minimumOfDaysToFill}).map((_, i)=>{
                    return (
                        <div key={i} className="w-10 h-10 bg-zinc-900 opacity-40 cursor-not-allowed border-2 border-zinc-800 rounded-lg"></div>
                    )
                })}
            </div>
        </div>
    )
}