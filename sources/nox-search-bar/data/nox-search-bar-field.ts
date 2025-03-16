import { NoxSearchBarFieldDropDownStaticItem } from "./nox-search-bar-field-drop-down-static-item";
import { NoxSearchBarFieldType } from "../enums/nox-search-bar-field-type";
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import { NoxTreeDropDownEmptySelectionType } from "../../nox-controls/components/nox-tree-drop-down/enums/nox-tree-drop-down-empty-selection-type";

export class NoxSearchBarField {
  id: string = "";
  name: string = "";
  title: string = "";
  type: NoxSearchBarFieldType = "text";
  defaultValue: any = null;
  width: any = "100px";
  dropDownWidth: any = "300px";
  dropDownItems?: any[];
  dropDownStaticItems?: NoxSearchBarFieldDropDownStaticItem[];
  dropDownItemDisplayFieldName?: string = "text";
  dropDownItemValueFieldName?: string = "value";
  dropDownChildrenFieldName?: string = "items";
  treeDropdownEmptySelectionType?: NoxTreeDropDownEmptySelectionType = "none";
  parentFieldName?: string = "";
  dropDownItemForeignKeyFieldName?: string = "";
  dropDownMultiSelect?: boolean = false;
  icon?: any;
  visible?: boolean = true;
  itemclass?: string = "";

  placeholder?: string = "";
}
