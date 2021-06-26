const pg = require('pg');
// we made this approach just keeping in mind  about testing


// Always use this pattern for Pooling the query...

class Pool {
    _pool = null;

    connect (options) {
        this._pool = new pg.Pool(options)
        return this._pool.query("SELECT 1 + 1;")
    }

    close() {
        return this._pool.end()
    }

    //!  * BIG SECURITY ISSUE * !//
    // this will secure from sql injection...
    query(sql, params) {
        return this._pool.query(sql, params)
    }

}

module.exports = new Pool()

