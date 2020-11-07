// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseModel {
  toString: () => string;
  fromJs: (js: any) => any;
  toJS: () => any;
}

export type { BaseModel };
