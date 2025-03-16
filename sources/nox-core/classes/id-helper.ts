import { CreateIdArgs } from "./create-id-args";

export class IdHelper {
  static createId(length: number = 16, args: CreateIdArgs = {
    prefix: "",
    lowerCaseLetters: true,
    upperCaseLetters: true,
    digitChars: true
  }) {
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digitChars = "0123456789";
    
    let chars = "";
    
    if (args.lowerCaseLetters)
      chars += lowerChars;
    if (args.upperCaseLetters)
      chars += upperChars;
    if (args.digitChars)
      chars += digitChars;

    let result = '';

    let counter = 0;
    while (counter < length) {      
      result += chars.charAt(Math.floor(Math.random() * chars.length));
      counter += 1;
    }

    // prefix
    if (args.prefix)
      return `${args.prefix}-${result}`;
    else
      return result;
  }
}
