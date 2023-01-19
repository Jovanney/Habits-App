import Fastify, { fastify } from 'fastify'
import cors from "@fastify/cors"
import { PrismaClient } from "@prisma/client" 
import { appRoutes } from './lib/routes'


const app = fastify()
const prisma = new PrismaClient()

app.register(cors)

app.register(appRoutes)



app.listen({
    port: 3333,
}).then(()=>{
    console.log(" HTTP Estou rodando")
})