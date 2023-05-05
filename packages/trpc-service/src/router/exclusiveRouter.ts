import { router, exclusiveProcedure } from "../trpc";
import {z} from 'zod'

const exclusiveRouter = router({
    hello: exclusiveProcedure
    .input(z.string())
    .query(({input}) => ({hello: `All hail ${input}!!!`}))
})

export default exclusiveRouter