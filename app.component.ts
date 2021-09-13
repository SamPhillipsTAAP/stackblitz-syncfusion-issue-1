import { Component, ViewEncapsulation } from '@angular/core';
import {
  FileManagerComponent,
  NavigationPaneService,
  ToolbarService,
  DetailsViewService,
  ToolbarSettingsModel,
  ContextMenuSettingsModel,
  MenuOpenEventArgs,
  FileSelectionEventArgs
} from '@syncfusion/ej2-angular-filemanager';
/**
 * File Manager full functionalities sample
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [NavigationPaneService, ToolbarService, DetailsViewService]
})
export class AppComponent {
  public ajaxSettings: object;
  public view: string;
  public acl: any;
  public hostUrl: string = 'https://ej2-aspcore-service.azurewebsites.net/';
  public ngOnInit(): void {
    this.ajaxSettings = {
      url: this.hostUrl + 'api/FileManager/FileOperations',
      getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
      uploadUrl: this.hostUrl + 'api/FileManager/Upload',
      downloadUrl: this.hostUrl + 'api/FileManager/Download'
    };
  }

  defaultToolbarLayoutSettings = [
    'NewFolder',
    'Upload',
    'SortBy',
    'Refresh',
    'View'
  ];

  defaultToolbarSelectionSettings = [
    'Cut',
    'Copy',
    'Paste',
    'Delete',
    'Download',
    'Rename',
    'Selection',
    'Details'
  ];

  defaultFileContextMenuItems = [
    'Open',
    '|',
    'Cut',
    'Copy',
    '|',
    'Delete',
    'Rename',
    '|',
    'Details'
  ];

  defaultFolderContextMenuItems = [
    'Open',
    '|',
    'Cut',
    'Copy',
    'Paste',
    '|',
    'Delete',
    'Rename',
    '|',
    'Details'
  ];

  defaultLayoutContextMenuItems = [
    'SortBy',
    'View',
    'Refresh',
    '|',
    'Paste',
    '|',
    'NewFolder',
    'Upload',
    '|',
    'Details',
    '|',
    'SelectAll'
  ];

  toolbarSettings: ToolbarSettingsModel = {
    visible: true,
    items: this.defaultToolbarLayoutSettings
  };

  contextMenuSettings: ContextMenuSettingsModel = {
    visible: true,
    file: this.defaultFileContextMenuItems,
    folder: this.defaultFolderContextMenuItems,
    layout: this.defaultLayoutContextMenuItems
  };

  async onContextMenuOpen(args: MenuOpenEventArgs) {
    if (args.fileDetails && args.fileDetails.length > 0) {
      if (args.menuType === 'file' || args.menuType === 'folder') {
        this.contextMenuSettings = {
          visible: true,
          file: [],
          folder: [],
          layout: []
        };

        await this.getRemoteACL();

        this.contextMenuSettings = {
          visible: true,
          file: ['Open', '|', 'Cut', 'Copy'],
          folder: ['Open', '|', 'Cut', 'Copy'],
          layout: ['Refresh']
        };
      }
    }
  }
  async onFileSelection(args: FileSelectionEventArgs) {
    if (args.action === 'unselect') {
      this.toolbarSettings = {
        visible: true,
        items: []
      };

      await this.getRemoteACL();

      this.toolbarSettings = {
        visible: true,
        items: ['Cut', 'Copy', 'Delete', 'NewFolder']
      };
    } else if (args.action === 'unselect') {
      await this.getRemoteACL();

      this.contextMenuSettings = {
        visible: true,
        file: this.defaultFileContextMenuItems,
        folder: this.defaultFolderContextMenuItems,
        layout: this.defaultLayoutContextMenuItems
      };

      this.toolbarSettings = {
        visible: true,
        items: this.defaultToolbarLayoutSettings
      };
    }
  }

  async getRemoteACL() {
    return new Promise<void>(resolve => setTimeout(resolve, 3000));
  }
}
