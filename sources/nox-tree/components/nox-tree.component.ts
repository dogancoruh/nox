import { AfterContentInit, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { NoxTreeSelectionMode } from '../enums/nox-tree-selection-mode';
import { NoxTreeSelectionStyle } from '../enums/nox-tree-selection-style';
import { NoxTreeNodeActionsComponent } from './nox-tree-node-actions.component';
import { NoxTreeNodeAction } from '../data/nox-tree-node-action';
import { NoxTreeNodeIconsComponent } from './nox-tree-node-icons.component';
import { NoxTreeNodeIcon } from '../data/nox-tree-node-icon';
import { NoxTreeNodeActionsAlign } from '../enums/nox-tree-node-actions-align';
import { NoxTreeNodeActionEvent } from '../events/nox-tree-node-action-event';
import { ObjectIterator } from '../../nox-core/classes/object-iterator';
import { ObjectIterationArgs } from '../../nox-core/classes/object-iteration-args';
import { NoxConfigurationService } from '../../nox-core/services/nox-configuration.service';
import { NoxTreeNodeExpandedEvent } from '../events/nox-tree-node-expanded-event';
import { NoxTreeNodeSelectionChangedEvent } from '../events/nox-tree-node-selection-changed-event';
import { NoxTreeNodeSelectedEvent } from '../events/nox-tree-node-selected-event';
import { NoxTreeDataRefreshReason } from '../enums/nox-tree-data-refresh-reason';
import { NoxAddButtonAppearance } from '../enums/nox-add-button-appearance';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoxTreeNodeComponent } from './nox-tree-node.component';
import { FormsModule } from '@angular/forms';

/*
  Iteration example

  ObjectIterator.itarate(this.data, (obj: any, iterationArgs: ObjectIterationArgs, ) => {
    if (obj["id"] == selectedNodeId) {
      obj["selected"] = true;
      iterationArgs.cancel = true;
    }
  }, "children");
*/

@Component({
  selector: 'nox-tree',
  templateUrl: 'nox-tree.component.html',
  styleUrls: ['nox-tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
    NoxTreeNodeComponent
  ]
})
export class NoxTreeComponent implements AfterContentInit {
  @ContentChild(NoxTreeNodeIconsComponent) itemIconsComponent!: NoxTreeNodeIconsComponent;
  @ContentChild(NoxTreeNodeActionsComponent) itemActionsComponent!: NoxTreeNodeActionsComponent;

  dataRefreshReason: NoxTreeDataRefreshReason = "none";
  defaultNodeIcon: any = null;
  nodeIcons: NoxTreeNodeIcon[] = [];
  nodeActions: NoxTreeNodeAction[] = [];
  rootNodeSelected: boolean = false;

  get selectedNode(): any {
    const selectedNodes = this.getSelectedNodes();

    if (selectedNodes.length > 0)
      return selectedNodes[0];
    else
      return null;
  }

  private _data: any;

  get data(): any {
    return this._data;
  }
  @Input() set data(value: any) {
    this._data = value;

    if (this.autoExpand)
      this.expandNodes(this.autoExpandDepth);

    this.indexItems();

    this.changeDetectorRef.detectChanges();
  }

  @Input() autoExpand: boolean = false;
  @Input() autoExpandDepth: number = 0;

  @Input() iconNodeExpanded: any;
  @Input() iconNodeCollapsed: any;
  @Input() iconAddNode: any;
  @Input() iconRemoveNode: any;
  @Input() iconEditNode: any;

  @Input() loadingText: string = "Loading...";
  @Input() loading: boolean = false;
  @Input() initialEmptyDataMessage: string = "There is no record yet.";
  @Input() searchEmptyDataMessage: string = "No record found for search parameters.";
  @Input() errorMessage: string = "";

  @Input() nodeAddIcon: any;
  @Input() childAddIcon: any;
  @Input() iconNodeContextMenu: any = faEllipsisVertical;

  @Input() textFieldName = "title";
  @Input() valueFieldName = "id";
  @Input() childrenFieldName: string = "children";
  @Input() expandedFieldName: string = "expanded";
  @Input() selectedFieldName: string = "selected";
  @Input() disabledFieldName: string = "disabled";
  @Input() iconTypeFieldName: string = "iconType";
  @Input() actionTypeFieldName: string = "actionType";
  @Input() indexFieldName: string = "index";

  @Input() readonly: boolean = false;
  @Input() selectable: boolean = true;
  @Input() selectionMode: NoxTreeSelectionMode = "single";
  @Input() selectionStyle: NoxTreeSelectionStyle = "fullRow";
  @Input() nodeActionsAlign: NoxTreeNodeActionsAlign = "left";

  @Input() canUserExpandCollapse: boolean = true;

  @Input() addRootNodeButtonText: string = "Add Node";
  @Input() addRootNodeButtonIcon: any;
  @Input() addButtonAppearance: NoxAddButtonAppearance = "primary";
  @Input() autoCollapseOtherExpandedNodes: boolean = false;

  @Input() rootNodeTitle: string = "";
  @Input() addRootNodeButtonVisible: boolean = false;
  @Input() ellipsisLength: number = 40;

  @Output() onNodeSelected = new EventEmitter<NoxTreeNodeSelectedEvent>();
  @Output() onSelectionChanged = new EventEmitter<NoxTreeNodeSelectionChangedEvent>();
  @Output() onAction = new EventEmitter<NoxTreeNodeActionEvent>();
  @Output() onAddRootNode = new EventEmitter();

  constructor(private configurationService: NoxConfigurationService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.initialEmptyDataMessage = this.configurationService.tableInitialEmptyText;
    this.searchEmptyDataMessage = this.configurationService.tableSearchEmptyText;
    this.loadingText = this.configurationService.tableLoadingText;

    this.iconNodeExpanded = this.configurationService.treeIconNodeExpanded;
    this.iconNodeCollapsed = this.configurationService.treeIconNodeCollapsed;
    this.iconNodeContextMenu = this.configurationService.treeIconNodeContextMenu;
  }

  ngAfterContentInit(): void {
    // icons
    if (this.itemIconsComponent) {
      this.itemIconsComponent.onChange.subscribe(() => {
        this.defaultNodeIcon = this.itemIconsComponent.defaultIcon;
        this.nodeIcons = this.itemIconsComponent.itemActions;
      });
      this.defaultNodeIcon = this.itemIconsComponent.defaultIcon;
      this.nodeIcons = this.itemIconsComponent.itemActions;
    }

    // actions
    if (this.itemActionsComponent) {
      this.itemActionsComponent.onChange.subscribe(() => {
        this.nodeActions = this.itemActionsComponent.itemActions;
      });
      this.nodeActions = this.itemActionsComponent.itemActions;
    }
  }

  onNodeSelectionChanged(event: any) {
    if (this.selectionMode == 'single')
      this.selectNode(event.node);

    // check for root node
    let allNodesSelected: boolean = true;

    for (let i = 0; i < this._data.length; i++) {
      const node: any = this._data[i];
      if (!node[this.selectedFieldName]) {
        allNodesSelected = false;
        break;
      }
    }

    this.rootNodeSelected = allNodesSelected;

    this.onSelectionChanged.emit(event);

    this.onNodeSelected.emit({
      node: event.node
    });
  }

  onActionHandler(event: NoxTreeNodeActionEvent) {
    this.onAction.emit(event);
  }

  selectNode(node: any) {
    this.data.forEach((node_: any) => {
      node_.selected = node_ == node;
      this.selectNodeRecusively(node_, node);
    });
  }

  selectNodeRecusively(parentNode: any, targetNode: any) {
    if (parentNode[this.childrenFieldName] != undefined) {
      const childNodes = parentNode[this.childrenFieldName];
      childNodes.forEach((childNode: any) => {
        childNode.selected = childNode == targetNode;
        this.selectNodeRecusively(childNode, targetNode);
      });
    }
  }

  expandNodes(depth: number = 0) {
    if (this._data) {
      ObjectIterator.iterate(this._data, (obj: any, iterationArgs: ObjectIterationArgs) => {
        if (depth == 0 || iterationArgs.depth < depth)
          obj[this.expandedFieldName] = true;
      }, this.childrenFieldName);
    }
  }

  indexItems() {
    if (this._data) {
      let index = 0;
      ObjectIterator.iterate(this._data, (obj: any, iterationArgs: ObjectIterationArgs) => {
        obj[this.indexFieldName] = index;
        index++;
      }, this.childrenFieldName);
    }
  }

  selectAll() {
    if (this._data) {
      ObjectIterator.iterate(this._data, (obj: any, iterationArgs: ObjectIterationArgs) => {
        obj[this.selectedFieldName] = true;
      }, this.childrenFieldName);
    }
  }

  selectNone() {
    if (this._data) {
      ObjectIterator.iterate(this._data, (obj: any, iterationArgs: ObjectIterationArgs) => {
        obj[this.selectedFieldName] = false;
      });
    }
  }

  expandAll() {
    if (this._data) {
      ObjectIterator.iterate(this._data, (obj: any, iterationArgs: ObjectIterationArgs) => {
        obj[this.expandedFieldName] = true;
      });
    }
  }

  collapseAll() {
    if (this._data) {
      ObjectIterator.iterate(this._data, (obj: any, iterationArgs: ObjectIterationArgs) => {
        obj[this.expandedFieldName] = false;
      });
    }
  }

  getSelectedNodes(): any[] {
    const result: any[] = [];

    if (this._data) {
      ObjectIterator.iterate(this._data, (obj: any, iterationArgs: ObjectIterationArgs) => {
        if (obj[this.selectedFieldName])
          result.push(obj);
      });
    }

    return result;
  }

  onNodeMoveUpHandler(event: any) {
    const movingNode = event.node;
    const movingNodeIndex = this._data.indexOf(movingNode);
    if (movingNodeIndex != -1) {
      if (movingNodeIndex > 0) {
        const swapNode = this._data[movingNodeIndex];
        this._data[movingNodeIndex] = this._data[movingNodeIndex - 1];
        this._data[movingNodeIndex - 1] = swapNode;
      }
    } else {
      throw new Error("Index not found");
    }
  }

  onNodeMoveDownHandler(event: any) {
    const movingNode = event.node;
    const movingNodeIndex = this._data.indexOf(movingNode);
    if (movingNodeIndex != -1) {
      if (movingNodeIndex < this._data.length - 1) {
        const swapNode = this._data[movingNodeIndex];
        this._data[movingNodeIndex] = this._data[movingNodeIndex + 1];
        this._data[movingNodeIndex + 1] = swapNode;
      }
    } else {
      throw new Error("Index not found");
    }
  }

  onAddRootNodeButtonClicked() {
    this.onAddRootNode.emit();
  }

  addNode(parentNode: any, node: any) {
    if (!parentNode[this.childrenFieldName])
      parentNode[this.childrenFieldName] = [];

    parentNode[this.childrenFieldName].push(node);
  }

  onNodeExpandedHandler(event: NoxTreeNodeExpandedEvent) {
    if (this._data) {
      if (this.autoCollapseOtherExpandedNodes) {
        for (let i = 0; i < this._data.length; i++) {
          const child = this._data[i];
          if (child != event.node && child[this.expandedFieldName]) {
            child[this.expandedFieldName] = false;
          }
        }
      }
    }
  }

  onNodeCollapsedHandler(event: NoxTreeNodeExpandedEvent) {

  }

  onInputCheckInput(event: Event) {
    const input = event.target as HTMLInputElement;

    this.rootNodeSelected = input.checked;

    ObjectIterator.iterate(this._data, (obj: any, iterationArgs: ObjectIterationArgs) => {
      obj[this.selectedFieldName] = input.checked;
    }, this.childrenFieldName);
  }

  getAddButtonClassNameForAppearance() {
    switch (this.addButtonAppearance) {
      case "primary":
        return "btn-primary";
      case "secondary":
        return "btn-secondary";
      case "outline":
        return "btn-outline-primary";
      default:
        return "primary";
    }
  }
}