/* eslint-disable arrow-parens */
import nodemailer from 'nodemailer';
import path from 'path';
import logger from './logger';

// tslint:disable-next-line: no-var-requires
const hbs = require('nodemailer-express-handlebars');

// Handlebars configuration
const hbsConfig = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.join(__dirname, '/public/templates/email/'),
    layoutsDir: path.join(__dirname, '/public/templates/email/'),
    defaultLayout: ''
  },
  viewPath: path.join(__dirname, '/public/templates/email/'),
  extName: '.hbs'
};

// Trandsporter nodemailer configuration. Testing email for now. Should refactor in the future.
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'nolan96@ethereal.email',
    pass: '1sjRCZEKQP5ncACkRh'
  }
});

// attach the plugin to the nodemailer transporter
transporter.use('compile', hbs(hbsConfig));

interface IEmailData {
  from: string;
  to: string;
  subject: string | null;
  template: string;
  context: Object;
}

// Sends an email following the specified emailData Object
export async function send(emailData: IEmailData) {
  await transporter.sendMail(emailData).catch((err) => {
    logger.log({
      level: 'error',
      message: `Error in sending email to ${emailData.to}`,
      error: err
    });
  });
}

export async function sendVerificationEmail(user: any, token: any) {
  const email = {
    from: 'Soporte Neox',
    to: user,
    subject: 'Hola',
    template: 'verification',
    context: { user, token }
  };
  send(email);
}
