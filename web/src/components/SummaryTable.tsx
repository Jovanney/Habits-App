import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const sumarryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // weeks

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const minimumOfDaysToFill = minimumSummaryDatesSize - sumarryDates.length

type Summary = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}[]

export const SummaryTable = () => {
    
    const [summary, setSumarry] = useState<Summary>([])

    useEffect(()=>{
        api.get('summary').then(response => {
            setSumarry(response.data)
        })
    },[])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                    weekDays.map((day, index)=>{
                        return(
                            <div key={`${day}_${index}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                                {day}
                            </div>
                        );
                    })
                }
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {sumarryDates.map(date => {
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day' )
                    })
                    return (
                    <HabitDay 
                        key={date.toString()}
                        date={date}    
                        amount={dayInSummary?.amount} 
                        completed={dayInSummary?.completed}                         
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