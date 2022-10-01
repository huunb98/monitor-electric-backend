import nodeMailer from 'nodemailer';

export class SendReport {
  private transporter: nodeMailer.Transporter;

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

  sendMailReport(title: string, text: string, receiver: string, cc: string[] | null) {
    try {
      this.transporter.sendMail({
        from: {
          name: 'Warning Service Notify',
          address: 'huunb@rocketstudio.com.vn',
        },
        to: receiver,
        cc: cc,
        subject: title,
        text: text,
      });
    } catch (error) {
      console.log('Send Mail Error', error);
    }
  }
}
