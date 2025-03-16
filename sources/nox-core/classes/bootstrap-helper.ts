import { NoxButtonAppearance } from "../enums/nox-button-appearance";

export class BootstrapHelper {
  static getButtonAppearanceClassName(appearance?: NoxButtonAppearance): string {
    switch (appearance) {
      case "primary":
        return "btn-primary";
      case "secondary":
        return "btn-secondary";
      case "link":
        return "btn-link";
      case "danger":
        return "btn-danger";
      case "outline":
        return "btn-outline-primary";
      default:
        return "btn-primary";
    }
  }
}
