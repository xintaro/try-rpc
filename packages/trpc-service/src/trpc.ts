import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import { createContext } from './app'
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'

type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()
const router = t.router
const mergeRouters = t.mergeRouters
const publicProcedure = t.procedure

const jwtCheck = auth({
    audience: 'http://localhost:8000',
    issuerBaseURL: 'https://xintaro.eu.auth0.com/',
    tokenSigningAlg: 'RS256'
});

const isAuthenticated = t.middleware((opts) => {
    const {ctx} = opts

    jwtCheck(ctx.req, ctx.res, opts.next)

    return opts.next()
})

const privateProcedure = t.procedure.use(isAuthenticated)

const checkScopes = requiredScopes('access:exclusive');
const isVIP = t.middleware((opts) => {
    const {ctx} = opts

    jwtCheck(ctx.req, ctx.res, opts.next)
    checkScopes(ctx.req, ctx.res, opts.next)

    return opts.next()
})
const exclusiveProcedure = t.procedure.use(isVIP)

export {
    Context,
    t,
    router,
    mergeRouters,
    publicProcedure,
    privateProcedure,
    exclusiveProcedure
}