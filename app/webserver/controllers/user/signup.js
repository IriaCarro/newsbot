'use strict'
const Joi = require('joi');
const uuidV4 = require('uuid/v4');
const User = require('../../../model/users');
const getUTCDate = require('../../../helper/get-utc-date');
const hash = require('../../../helper/hash');

async function signup(req, res, next) {
      const userData = req.body;
      try {
            await validateSchema(userData);

            if (await User.findOne({ email: userData.email })) {
                  throw 'Email "' + userData.email + '" is already taken';
            }

            const user = new User(userData);
            user.uuid = uuidV4();
            user.hash = await hash.hashear(userData.password);
            user.created_at = getUTCDate(new Date());
            try {
                  await user.save();
                  return res.status(201).send();
            } catch (e) {
                  return res.status(500).send(e.message);
            }
      } catch (e) {
            return res.status(400).send(e);
      }
}

async function validateSchema(payload) {
      const schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            name: Joi.string().min(3).max(128).required(),
            username: Joi.string().min(3).max(128).required(),
      };

      return Joi.validate(payload, schema);
}

module.exports = signup;