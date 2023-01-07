"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
class DateHelper {
    getLocalTime() {
        let tzTime = this.convertTZ(new Date(), 'Asia/Ho_Chi_Minh');
        let day = this.formatDate(new Date());
        let result = `${tzTime.getHours()}h${tzTime.getMinutes()} ngày ${day}`;
        return result;
    }
    convertTZ(date, tzString) {
        return new Date(date.toLocaleString('en-US', { timeZone: tzString }));
    }
    formatDate(date) {
        return [this.padTo2Digits(date.getDate()), this.padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
    }
    padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
}
exports.DateHelper = DateHelper;
//# sourceMappingURL=dateHelper.js.map