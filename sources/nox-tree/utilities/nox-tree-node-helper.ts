export class NoxTreeNodeHelper {
    static getNodeTitle(node: any, fieldName: string = "title"): string {
        if (node) {
            if (node[fieldName]) {
                return node[fieldName];
            } else {
                return "";
            }
        } else {
            return "";
        }        
    }

    static getNodeSelectable(node: any, fieldName: string = "selectable"): boolean {
        if (node) {
            if (node[fieldName]) {
                return node[fieldName];
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    static getNodeExpanded(node: any, fieldName: string = "expanded"): boolean {
        if (node) {
            if (node[fieldName]) {
                return node[fieldName];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static getNodeSelected(node: any, fieldName: string = "selected"): boolean {
        if (node) {
            if (node[fieldName]) {
                return node[fieldName];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static getNodeIndex(node: any, fieldName: string = "index"): number {
        if (node) {
            if (node[fieldName]) {
                return node[fieldName];
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }
}