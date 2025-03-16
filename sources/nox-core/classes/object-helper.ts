import { formatDate } from "@angular/common";

export class ObjectHelper {
  static getPropertyAsString(obj: any, name: string): string {
    if (obj) {
      if (obj[name]) {
        return obj[name];
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  static getPropertyAsInt(obj: any, name: string): number {
    if (obj) {
      if (obj[name]) {
        return Number.parseInt(obj[name]);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  static getPropertyAsFloat(obj: any, name: string): number {
    if (obj) {
      if (obj[name]) {
        return Number.parseFloat(obj[name]);
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  static getPropertyAsBoolean(obj: any, name: string): boolean {
    if (obj) {
      if (obj[name]) {
        const valueStr = obj[name].toString();
        return valueStr.toLowerCase() == "true";
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  static getPropertyAsDateTime(obj: any, name: string, format?: string): string {
    if (obj) {
      if (obj[name]) {
        const valueStr = obj[name].toString();
        if (format) {
          /*
          const valueDate = moment(valueStr, "YYYY-MM-DDTHH:mm:ss.000")
          return moment(valueDate).format(format);
          */
         return valueStr;
        } else {
          return valueStr;
        }
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  // not implemented
  static getReferenceByPath(obj: any, path: string): any {
    const tokens = path.split(".");

    let ssIndex = 0;
    let seIndex = 0;

    return null;
  }
}
