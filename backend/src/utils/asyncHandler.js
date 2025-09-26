const asyncHandler = (fn) => {
    async (req, res, next) => {
        try {
            const requestHandler = await fn(req, res, next)
            return requestHandler
        } catch (error) {
            next(error)
        }
    }
}


// const asyncHandler = (fn) => {
//     return (req, res, next) => {
//         Promise.resolve(fn(req, res, next))
//         .catch((error) => next(error))
//     }
// }



export { asyncHandler }