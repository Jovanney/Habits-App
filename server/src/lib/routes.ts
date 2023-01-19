import dayjs from "dayjs"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "./prisma"

export async function appRoutes(app: FastifyInstance) {
  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().min(0).max(6)
      ),
    })

    const { title, weekDays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        HabitWeekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            }
          }),
        }
      }
    })
  })

  app.get('/day', async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date() //coerce converte o parametro que eu receber no date para date obj
        })
        const {date} = getDayParams.parse(request.query)

        const parsedDay = dayjs(date).startOf('day')

        const weekDay = parsedDay.get('day')
        //todos hábitos possíveis 
        //hábitos que já foram completados
        
        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },
                HabitWeekDays: {
                    some: {
                        week_day: weekDay,
                    }
                }
            }
        })
  
        const day = await prisma.day.findUnique({
            where:{
                date: parsedDay.toDate(),
            },
            include: {
                DayHabits: true,
            }
        })
        
        const completedHabits = day?.DayHabits.map(dayHabit => {
            return dayHabit.habit_id
        })

        return {
            possibleHabits,
            completedHabits,
        }
    })

    



}