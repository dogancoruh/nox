import { ActivatedRoute } from "@angular/router";

export class LinkHelper {
  static processUrlData(value: string, data: any) {
    let value_ = value;
    for (const propertyName in data)
      value_ = value_.replaceAll("{data." + propertyName + "}", data[propertyName]);
    return value_;
  }

  static processUrlQueryParams(value: string, activatedRoute: ActivatedRoute): string {
    let value_ = value;

    // query parameters
    var regExp = new RegExp("{query.\s*(.+?)\s*}");
    while (regExp.test(value_)) {
      var match = regExp.exec(value_);
      if (match) {
        const source = match[0];
        const target = activatedRoute.snapshot.params[match[1]];
        value_ = value_.replaceAll(source, target);
      }
    }

    return value_;
  }
}
