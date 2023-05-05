import { router, publicProcedure } from "../trpc";
import {z} from 'zod'

const publicRouter = router({
    hello: publicProcedure
    .input(z.string())
    .query(({input}) => ({hello: `Hello ${input}`}))
})

export default publicRouter