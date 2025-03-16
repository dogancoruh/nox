export declare type EllipsesTrimSide = "fromBeginning" | "fromEnd";

export class StringHelper {
  static formatString(str: string, ...val: any[]): string {
    for (let index = 0; index < val.length; index++) {
      str = str.replace(`{${index}}`, val[index]?.toString());
    }
    return str;
  }

  static fixedDigit(value: number, digitCount: number): string {
    let valueStr = value.toString();

    const valueStrLength = valueStr.length;
    for (let i = 0; i < digitCount - valueStrLength; i++) {
      valueStr = "0" + valueStr;
    }

    return valueStr;
  }

  static ellipses(text: string, length: number, trimSide: EllipsesTrimSide = "fromEnd"): string {
    let result = "";

    if (text.length >= length) {
      if (trimSide == "fromBeginning") {
        result = "..." + text.substring(text.length - length, text.length);
      } else if (trimSide == "fromEnd") {
        result = text.substring(0, length) + "...";
      }
    } else {
      result = text;
    }

    return result;
  }
}
