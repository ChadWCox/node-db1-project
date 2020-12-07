const db = require('../../data/dbConfig');

module.exports = {
    getAll() {
        return db('accounts')
    },
    getById(id) {
        return db('accounts').where('id', id).first()
    },
    create(account) {
        return db('accounts').insert(account)
            .then(([id]) => {
                return db.getById(id).first()
            })
            .catch(err => {
                err.message
            })
    },
    update(id, account) {
        return db('accounts').where('id', id).update(account)
    },
    delete(id) {
        return db('accounts').where('id', id).del()
    }
}