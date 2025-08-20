export default class PageInfo {
  title: string;
  url: string;
  tabName: string;

  constructor(title: string, url: string, tabName: string) {
    this.title = title;
    this.url = url;
    this.tabName = tabName;
  }

  getTitle(): string {
    return this.title;
  }

  getUrl(): string {
    return this.url;
  }

  getTab(): string {
    return this.tabName;
  }

  getAddOrUpdateModalId(): string {
    return `add_or_update_${this.getTitle()}_modal`;
  }

  getDeleteModalId(): string {
    return `delete_${this.getTitle()}_modal`;
  }

  getFetchUrl(): string {
    return `/${this.getUrl()}`;
  }

  getDeleteUrl(): string {
    return `/${this.getUrl()}`;
  }

  getTabName(): string {
    return (
      this.tabName
        ?.split('__')
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1).replace(/_/g, ' ')
        )
        .join(': ') || ''
    );
  }
}
