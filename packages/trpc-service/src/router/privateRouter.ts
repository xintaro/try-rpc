import { router, privateProcedure } from "../trpc";
import {z} from 'zod'

const privateRouter = router({
    hello: privateProcedure
    .input(z.string())
    .query(({input}) => ({hello: `Welcome back ${input}`}))
})

export default privateRouter