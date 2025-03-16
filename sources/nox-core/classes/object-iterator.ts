import { ObjectIterationArgs } from "./object-iteration-args";

export class ObjectIterator {
  static iterate(obj: any | undefined, iterationHandler: any, childrenFieldName: string = "children") {
    const iterationArgs: any = {
      depth: 0,
      cancel: false
    };

    this.iterateRecursively(obj, iterationHandler, iterationArgs, childrenFieldName);
  }

  static iterateRecursively(obj: any | undefined, iterationHandler: any, iterationArgs: ObjectIterationArgs, childrenFieldName: string) {
    if (obj instanceof Array) {
      const arr = obj as [];
      for (let i = 0; i < arr.length; i++) {
        const item: any = arr[i];

        const userIterationArgs: any = {
          depth: iterationArgs.depth,
          cancel: false
        };

        iterationHandler(item, userIterationArgs);

        if (userIterationArgs.cancel) {
          iterationArgs.cancel = true;
          break;
        }

        if (item[childrenFieldName]) {
          iterationArgs.depth++;

          this.iterateRecursively(item[childrenFieldName], iterationHandler, iterationArgs, childrenFieldName);

          iterationArgs.depth--;

          if (iterationArgs.cancel)
            break;
        }
      }
    }
  }
}