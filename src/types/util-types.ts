export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type OptionSetSingle<
    Options,
    Selected extends keyof Options = keyof Options
> = Selected extends keyof Options
    ? {
          _selected: Selected;
      } & { [Key in Selected]: Options[Key] }
    : never;

export type OptionSetMulti<Options> = {
    _selected: Array<keyof Options>;
} & { [Key in keyof Options]: Options[Key] };

export type EmptyObject = Record<string, never>;
