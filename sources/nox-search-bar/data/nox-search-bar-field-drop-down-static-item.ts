import { NoxSearchBarDropDownStaticItemMergeSide } from "../enums/nox-search-bar-field-drop-down-item-merge-side";

export class NoxSearchBarFieldDropDownStaticItem {
  text: string = "";
  value: string | null = null;
  mergeSide: NoxSearchBarDropDownStaticItemMergeSide = "top";
}
