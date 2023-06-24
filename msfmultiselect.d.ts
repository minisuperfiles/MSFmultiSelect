export interface MSFmultiSelectSettings {
  width?: number;
  height?: number;
  className?: string;
  onChange?: (
    checked: boolean,
    value: string,
    instance: MSFmultiSelect
  ) => void;
  selectAll?: true;
  searchBox?: true;
  appendTo?: string;
  readOnly?: boolean;
  afterSelectAll?: (
    checked: boolean,
    value: string,
    instance: MSFmultiSelect
  ) => void;
  autoHide?: boolean;
}
export interface MSFmultiSelectSource {
  caption: string;
  value: string | number;
  selected?: boolean;
}
/* MSFmultiSelect v2.5
 * Copyright (c) 2020 Mini Super Files | https://github.com/minisuperfiles/MSFmultiSelect/blob/master/LICENSE
 * https://github.com/minisuperfiles/MSFmultiSelect
 * https://minisuperfiles.blogspot.com/p/documentation.html?project=msfmultiselect
 */
export declare class MSFmultiSelect {
  constructor(select: Element | string, settings?: MSFmultiSelectSettings);
  setValue(selected: Array<string | number>, trigger?: boolean): void;
  removeValue(selected: Array<string | number>, trigger?: boolean): void;
  getData(): Array<string | number>;
  selectAll(isSetValue?: boolean): void;
  loadSource(data: Array<MSFmultiSelectSource>): void;
  getSource(): Array<MSFmultiSelectSource>;
  reload(): void;
}
