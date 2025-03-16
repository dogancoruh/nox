export class DateTimeHelper {
  static parseDateTime(value: string, format: string) {
        const date = new Date(Date.parse(value))
  }

  static timeStamp(){
    return (new Date()).getTime();
  }
}
