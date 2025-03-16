import { NoxButtonAppearance } from "../../nox-core/enums/nox-button-appearance";
import { NoxFormButtonType } from "../enums/nox-form-button-type";

export class NoxFormButton {
  id: string = "";
  name: string = "";
  type: NoxFormButtonType = "button";
  enabled?: boolean = true;
  visible?: boolean = true;
  appearance?: NoxButtonAppearance = "primary";
  title: string = "";
  link?: [] | string = "";
  validation?: boolean = false;
}
