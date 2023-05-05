import { mergeRouters } from '../trpc'
import publicRouter from './publicRouter'
import privateRouter from './privateRouter'
import exclusiveRouter from './exclusiveRouter'

type AppRouter = typeof appRouter

const appRouter = mergeRouters(publicRouter, privateRouter, exclusiveRouter)

export default appRouter;
export {
    AppRouter
}