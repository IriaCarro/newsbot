'use strict'

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require('../../../model/users');
const hash = require('../../../helper/hash');


async function validateData(payload) {
      const schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      };

      return Joi.validate(payload, schema);
}

async function login(req, res, next) {
      const userData = { ...req.body };
      try {
            await validateData(userData);
      } catch (e) {
            return res.status(400).send(e);
      }

      try {
            const user = await User.findOne({ email: userData.email });
            if (user && await hash.matchHash(userData.password, user.hash)) {

                  const payloadJwt = {
                        uuid: user.uuid,
                        role: 'admin',
                  };

                  const jwtTokenExpiration = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL, 10);
                  const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, { expiresIn: jwtTokenExpiration });
                  const response = {
                        accessToken: token,
                        expiresIn: jwtTokenExpiration,
                  };

                  return res.status(200).json(response);
            } else {
                  return res.status(401).send();
            }
      } catch (e) {
            console.log(e);
            return res.status(500).send(e.message);
      }
}

module.exports = login;