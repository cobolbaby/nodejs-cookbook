// const redis = require('redis');
// const assert = require('assert');

// const redisClient = redis.createClient({
//     host: 'redis.shujushijue.cn',
//     port: '6379',
//     password: 'shujuguan',
//     db: 8,
//     prefix: 'test:',

// });

// redisClient.on("error", function (err) {
//     sails.log.error(err);
// });

// let clientN = 0;
// const TESTHASH = 'hash1';

// module.exports = {

//     verifyHget: function(req, res) {
//         // 获取 1->clientN 的随机值
//         let key = 'ed664d9c6a1fd68b06' + Math.ceil(Math.random() * clientN);
//         redisClient.hget(TESTHASH, key, (err, reply) => {
//             if (err) {
//                 sails.log.error('redis hget method throw error:');
//                 sails.log.error(err);
//                 return res.serverError();
//             }
//             if (!reply) {
//                 sails.log.error(`${key}'s value:`, reply);
//                 return res.serverError();
//             }
//             return res.ok();
//         });
//     },

//     verifyHset: function(req, res) {
//         sails.log.debug('已接收请求数：', clientN++);
//         let key = `ed664d9c6a1fd68b06${clientN}`;
//         let val = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxNzczNiIsInVzZXJuYW1lIjoibC1qc0AyNjMubmV0IiwibGF';
//         redisClient.hset(TESTHASH, key, val, (err, reply) => {
//             if (err) {
//                 sails.log.error("redis hset method throw error:");
//                 sails.log.error(err);
//                 return res.serverError();
//             }
//             return res.created();
//         });
//     },

//     getHashLen: function(req, res) {
//         redisClient.hlen(TESTHASH, (err, reply) => {
//             if (err) {
//                 sails.log.error("redis hlen method throw error:");
//                 sails.log.error(err);
//                 return res.serverError();
//             }
//             sails.log.info(`${TESTHASH} hlen is`, reply);
//             return res.ok();
//         })
//     }
// };
