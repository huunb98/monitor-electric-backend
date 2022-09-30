import nodeMailer from 'nodemailer';

export class SendReport {
  transporter: nodeMailer.Transporter;

  constructor() {
    this.initTransport();
  }

  private initTransport() {
    this.transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MailUsername,
        pass: process.env.MailPassword,
      },
      logger: false,
    });
  }

  sendMailReport(title: string, text: string, receiver: string) {
    try {
      this.transporter.sendMail({
        from: {
          name: 'HuuNB',
          address: 'huunb@rocketstudio.com.vn',
        },
        to: receiver,
        subject: title,
        text: text,
      });
    } catch (error) {
      console.log('Send Mail Error', error);
    }
  }
}
