import express from 'express'
import cors from 'cors'
import * as tRPCExpress from '@trpc/server/adapters/express'
import appRouter from './router'

export const createContext = ({ req, res }: tRPCExpress.CreateExpressContextOptions) => ({ req, res });

const app = express()

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        callback(null, true)
    }
}))

app.use(
    '/',
    tRPCExpress.createExpressMiddleware({
        router: appRouter,
        createContext
    })
)

export default app