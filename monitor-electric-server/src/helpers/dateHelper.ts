export class DateHelper {
  getLocalTime() {
    let tzTime = this.convertTZ(new Date(), 'Asia/Ho_Chi_Minh');
    let day = this.formatDate(new Date());
    let result = `${tzTime.getHours()}h${tzTime.getMinutes()} ngày ${day}`;
    return result;
  }

  private convertTZ(date: Date, tzString: string) {
    return new Date(date.toLocaleString('en-US', { timeZone: tzString }));
  }

  private formatDate(date) {
    return [this.padTo2Digits(date.getDate()), this.padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
  }
  private padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
}
