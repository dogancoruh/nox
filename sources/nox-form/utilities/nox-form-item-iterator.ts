import { NoxFormFieldGroup } from "../data/nox-form-field-group";
import { NoxFormItem } from "../data/nox-form-item";

export class NoxFormItemIterator {
  static itarateItems(items: NoxFormItem[] | undefined, iterationHandler: any) {
    const iterationArgs: any = {
      depth: 0,
      cancel: false
    };

    this.iterateItemsRecursively(items, iterationHandler, iterationArgs);
  }

  static iterateItemsRecursively(items: NoxFormItem[] | undefined, iterationHandler: any, iterationArgs: any) {
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const userIterationArgs: any = {
          depth: iterationArgs.depth,
          cancel: false
        };

        iterationHandler(items[i], userIterationArgs);

        if (userIterationArgs.cancel) {
          iterationArgs.cancel = true;
          break;
        }

        if (items[i] instanceof NoxFormFieldGroup) {
          const fieldGroup = items[i] as NoxFormFieldGroup;
          if (fieldGroup) {
            iterationArgs.depth++;
            this.iterateItemsRecursively(fieldGroup.items, iterationHandler, iterationArgs)
            iterationArgs.depth--;

            if (iterationArgs.cancel)
              break;
          }
        }
      }
    }
  }
}
