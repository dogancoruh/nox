import { NoxFormFieldDropDownItem } from "./nox-form-field-drop-down-item";
import { NoxFormFieldStaticDropDownItemMergeSide } from "../enums/nox-form-field-static-drop-down-item-merge-side";

export class NoxFormFieldStaticDropDownItem extends NoxFormFieldDropDownItem {
  hasNullValue: boolean = false;
  mergeSide: NoxFormFieldStaticDropDownItemMergeSide = "top";
}
