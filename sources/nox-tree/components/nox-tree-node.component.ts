import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoxTreeComponent } from './nox-tree.component';
import { NoxTreeNodeHelper } from '../utilities/nox-tree-node-helper';
import { NoxTreeNodeAction } from '../data/nox-tree-node-action';
import { NoxTreeNodeIcon } from '../data/nox-tree-node-icon';
import { NoxTreeNodeActionsAlign } from '../enums/nox-tree-node-actions-align';
import { NoxTreeNodeActionEvent } from '../events/nox-tree-node-action-event';
import { ObjectIterator } from '../../nox-core/classes/object-iterator';
import { ObjectIterationArgs } from '../../nox-core/classes/object-iteration-args';
import { NoxTreeSelectionMode } from '../enums/nox-tree-selection-mode';
import { NoxTreeNodeSelectionChangedEvent } from '../events/nox-tree-node-selection-changed-event';
import { NoxTreeNodeExpandedEvent } from '../events/nox-tree-node-expanded-event';
import { NoxTreeNodeCollapsedEvent } from '../events/nox-tree-node-collapsed-event';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { LinkHelper } from '../../nox-core/classes/link-helper';
import { IdHelper } from '../../nox-core/classes/id-helper';
import { StringHelper } from '../../nox-core/classes/string-helper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'nox-tree-node',
  templateUrl: 'nox-tree-node.component.html',
  styleUrls: ['nox-tree-node.component.scss'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    FormsModule
  ]
})
export class NoxTreeNodeComponent {
  uiId: string = IdHelper.createId();

  loadingData: boolean = false;
  errorMessage: string = "";
  isCollapsed: boolean = true;

  @Input() iconContextMenu: any = faEllipsisVertical;

  @Input() isRootNode!: boolean;
  @Input() iconNodeExpanded: any;
  @Input() iconNodeCollapsed: any;
  @Input() iconAddNode: any;
  @Input() iconRemoveNode: any;
  @Input() iconEditNode: any;

  @Input() defaultNodeIcon: any = null;
  @Input() nodeIcons: NoxTreeNodeIcon[] = [];
  @Input() nodeActions: NoxTreeNodeAction[] = [];
  @Input() nodeActionsAlign: NoxTreeNodeActionsAlign = "left";

  @Input() tree!: NoxTreeComponent;

  @Input() node: any;
  @Input() depth!: number;

  @Input() textFieldName = "title";
  @Input() valueFieldName = "id";
  @Input() keyFieldName = "id";
  @Input() parentKeyFieldName = "parentId";
  @Input() childrenFieldName: string = "children";
  @Input() expandedFieldName: string = "expanded";
  @Input() selectedFieldName: string = "selected";
  @Input() disabledFieldName: string = "disabled";
  @Input() indexFieldName: string = "index";

  @Input() iconTypeFieldName: string = "iconType";
  @Input() actionTypeFieldName: string = "actionType";

  @Input() readonly: boolean = false;
  @Input() selectable: boolean = false;
  @Input() selectionMode: NoxTreeSelectionMode = "single";

  @Input() canUserExpandCollapse: boolean = true;
  @Input() autoCollapseOtherExpandedNodes: boolean = false;

  @Input() ellipsisLength: number = 0;

  @Output() onSelectionChanged = new EventEmitter<NoxTreeNodeSelectionChangedEvent>();
  @Output() onNodeExpanded = new EventEmitter<NoxTreeNodeExpandedEvent>();
  @Output() onNodeCollapsed = new EventEmitter<NoxTreeNodeCollapsedEvent>();
  @Output() onAction = new EventEmitter<NoxTreeNodeActionEvent>();
  @Output() onMoveDown = new EventEmitter();
  @Output() onMoveUp = new EventEmitter();

  @Output() onAdd = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  getNodeTitle = NoxTreeNodeHelper.getNodeTitle;
  getNodeSelectable = NoxTreeNodeHelper.getNodeSelectable;
  getNodeExpanded = NoxTreeNodeHelper.getNodeExpanded;
  getNodeSelected = NoxTreeNodeHelper.getNodeSelected;
  getNodeIndex = NoxTreeNodeHelper.getNodeIndex;

  getChildNodes() {
    let result: any = [];

    if (this.node[this.childrenFieldName] && this.node[this.childrenFieldName].length > 0) {
      const subNodes = this.node[this.childrenFieldName];
      for (let i = 0; i < subNodes.length; i++) {
        result.push(subNodes[i]);
      }
    }

    return result;
  }

  hasChildNodes(): boolean {
    return this.node[this.childrenFieldName] && this.node[this.childrenFieldName].length > 0;
  }

  onClick(event: MouseEvent) {
    // event.stopPropagation(); ?? 29.09.2024 Sprint 1
    // event.preventDefault();

    this.select();
  }

  select() {
    if (this.selectable && this.selectionMode == "single") {
      this.node[this.selectedFieldName] = true;

      this.onSelectionChanged.emit({
        node: this.node,
        selected: this.getNodeSelected(this.node, this.selectedFieldName)
      });
    }
  }

  onDoubleClick() {
    if (this.hasChildNodes() && this.canUserExpandCollapse)
      this.node[this.expandedFieldName] = !this.node[this.expandedFieldName];
  }

  onInputCheckInput(event: Event, node: any) {
    const input = event.target as HTMLInputElement;

    this.node[this.selectedFieldName] = input.checked;

    if (this.node[this.childrenFieldName]) {
      ObjectIterator.iterate(this.node[this.childrenFieldName], (obj: any, iteractionArgs: ObjectIterationArgs) => {
        obj[this.selectedFieldName] = input.checked;
      });
    }

    this.onSelectionChanged.emit({
      node: this,
      selected: input.checked
    });
  }

  onInputCheckDoubleClick(event: MouseEvent) {
    event.stopImmediatePropagation();
  }

  onNodeSelectionChanged(event: any) {
    let allNodesSelected: boolean = true;

    const nodes = this.node[this.childrenFieldName];
    for (let i = 0; i < nodes.length; i++) {
      const node: any = nodes[i];
      if (!node[this.selectedFieldName]) {
        allNodesSelected = false;
        break;
      }
    }

    this.node[this.selectedFieldName] = allNodesSelected;

    this.onSelectionChanged.emit(event);
  }

  onActionHandler(event: MouseEvent, action: NoxTreeNodeAction, node: any) {
    event.stopPropagation();
    event.preventDefault();

    this.select();

    if (action.standartAction == "moveDown") {
      this.onMoveDown.emit({
        node: this.node
      });
    } else if (action.standartAction == "moveUp") {
      this.onMoveUp.emit({
        node: this.node
      });
    }

    this.onAction.emit({
      node: node,
      action: action
    });
  }

  onNodeActionHandler(event: NoxTreeNodeActionEvent) {
    this.onAction.emit(event);
  }

  onNodeMoveUpHandler(event: any) {
    const movingNode = event.node;
    const nodes = this.node[this.childrenFieldName];
    const movingNodeIndex = nodes.indexOf(movingNode);
    if (movingNodeIndex != -1) {
      if (movingNodeIndex > 0) {
        const swapNode = nodes[movingNodeIndex];
        nodes[movingNodeIndex] = nodes[movingNodeIndex - 1];
        nodes[movingNodeIndex - 1] = swapNode;
      }
    } else {
      throw new Error("Index not found");
    }
  }

  onNodeMoveDownHandler(event: any) {
    const movingNode = event.node;
    const nodes = this.node[this.childrenFieldName];
    const movingNodeIndex = nodes.indexOf(movingNode);
    if (movingNodeIndex != -1) {
      if (movingNodeIndex < nodes.length - 1) {
        const swapNode = nodes[movingNodeIndex];
        nodes[movingNodeIndex] = nodes[movingNodeIndex + 1];
        nodes[movingNodeIndex + 1] = swapNode;
      }
    } else {
      throw new Error("Index not found");
    }
  }

  onCollapseExpandButtonClicked() {
    if (this.canUserExpandCollapse) {
      this.node[this.expandedFieldName] = !this.node[this.expandedFieldName];

      if (this.node[this.expandedFieldName]) {
        this.onNodeExpanded.emit({
          node: this.node
        });
      } else {
        this.onNodeCollapsed.emit({
          node: this.node
        });
      }
    }
  }

  getNodeIcon(node: any): any {
    for (let i = 0; i < this.nodeIcons.length; i++) {
      const nodeIcon = this.nodeIcons[i];
      if (nodeIcon.type &&
        this.node[this.iconTypeFieldName] &&
        nodeIcon.type == this.node[this.iconTypeFieldName])
        return nodeIcon.icon;
    }

    return this.defaultNodeIcon;
  }

  onNodeExpandedHandler(event: NoxTreeNodeExpandedEvent) {
    if (!event.handled && this.node[this.childrenFieldName]) {
      const children = this.node[this.childrenFieldName];

      if (this.autoCollapseOtherExpandedNodes) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (child != event.node && child[this.expandedFieldName]) {
            child[this.expandedFieldName] = false;
          }
        }
      }
    }

    this.onNodeExpanded.emit({
      node: event.node,
      handled: true
    });
  }

  onNodeCollapsedHandler(event: NoxTreeNodeCollapsedEvent) {
    this.onNodeCollapsed.emit({
      node: event.node
    });
  }

  getNonContextNodeActions(): NoxTreeNodeAction[] {
    const result: NoxTreeNodeAction[] = [];

    for (let i = 0; i < this.nodeActions.length; i++) {
      if (!this.nodeActions[i].isContext)
        result.push(this.nodeActions[i]);
    }

    return result;
  }

  getContextNodeActions(): NoxTreeNodeAction[] {
    const result: NoxTreeNodeAction[] = [];

    for (let i = 0; i < this.nodeActions.length; i++) {
      if (this.nodeActions[i].isContext)
        result.push(this.nodeActions[i]);
    }

    return result;
  }

  hasContextAction(): boolean {
    for (let i = 0; i < this.nodeActions.length; i++) {
      if (this.nodeActions[i].isContext)
        return true;
    }

    return false;
  }

  getActionLink(action: NoxTreeNodeAction, node: any): string[] {
    const result: string[] = [];

    if (action.link) {
      let link = action.link;

      link = LinkHelper.processUrlData(link, node);
      link = LinkHelper.processUrlQueryParams(link, node);

      result.push(link);
    }

    return result;
  }

  getActionTemplateContext(node: any, action: NoxTreeNodeAction, actionIndex: number) {
    return {
      node: node,
      nodeIndex: this.getNodeIndex(node, this.indexFieldName),
      action: action,
      actionIndex: actionIndex,
    };
  }

  getNodeTitleEx(node: any, fieldName: string): string {
    const title = this.getNodeTitle(node, fieldName);
    return StringHelper.ellipses(title, this.ellipsisLength);
  }
}
