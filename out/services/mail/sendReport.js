"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendReport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class SendReport {
    constructor() {
        this.initTransport();
    }
    initTransport() {
        this.transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'huunb@rocketstudio.com.vn',
                pass: 'fgmsdbxmhucilcjn',
            },
            logger: false,
        });
    }
    sendMailReport(title, text, receiver) {
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
        }
        catch (error) {
            console.log('Send Mail Error', error);
        }
    }
}
exports.SendReport = SendReport;
//# sourceMappingURL=sendReport.js.map