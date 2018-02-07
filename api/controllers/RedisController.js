
const redisClient = null;

module.exports = {

    testhget: function(req, res) {
        redisClient.hget('testhash', 'key1', (err, reply) => {
            if (err) {
                sails.log.error('hget throw err');
                sails.log.error(err);
                return res.serverError();
            }
            if (!reply) {
                sails.log.error('key1:', reply);
                return res.serverError();
            }
            return ok();
        });
    },

    testhset: function(req, res) {
        redisClient.hset("testhash", "key1", "value1", (err, reply) => {
            if (err) {
                sails.log.error("hset throw err");
                sails.log.error(err);
                return res.serverError();
            }
            return ok();
        });
    }
};
