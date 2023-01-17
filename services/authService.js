const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');
const UserService = require('./userService');
const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();;
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtsecret);
    return {
      user,
      token
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtsecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      //from: config.smtpEmail,
      //to: `${user.email}`,
      from: 'andresosoriosegura@gmail.com', // sender address
      to: 'andresosoriosegura@gmail.com',
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        //user: config.smtpEmail,
        //pass: config.smtpPassword
        user: 'andresosoriosegura@gmail.com',
        pass: 'edyynpyppxjklagp'
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtsecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {recoveryToken: null, password: hash});
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}


  /*async sendMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: 'andresosoriosegura@gmail.com',
        pass: 'edyynpyppxjklagp'
      }
    });
    await transporter.sendMail({
      from: 'andresosoriosegura@gmail.com', // sender address
      //to: `${user.email}`, // list of receivers
      to: 'andresosoriosegura@gmail.com',
      subject: "Este es un nuevo correo", // Subject line
      text: "Hola Osorio", // plain text body
      html: "<b>Hola Osorio</b>", // html body
    });
    return { message: 'mail sent' };
  }*/


module.exports = AuthService;
