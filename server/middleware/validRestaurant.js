module.exports = (req, res, next) => {

    try {
        const { name, location, price_range } = req.body

        if (!name || !location || !price_range) {
            return res.status(204).json("Invalid Information")
        }else{
            next()
        }
    } catch (err) {
        console.error(err)
        return res.status(403).json('Not Authorized')
    }
}