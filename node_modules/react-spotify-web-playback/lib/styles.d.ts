import * as React from 'react';
import { CssLikeObject } from 'nano-css/types/common';
import { IStyledComponentProps, IStylesOptions, IStylesProps } from './types/common';
declare const keyframes: ((frames: object, block?: string | undefined) => string) | undefined, styled: (tag: string) => (styles: CssLikeObject, dynamicTemplate?: ((props: IStyledComponentProps) => CssLikeObject) | undefined, block?: string | undefined) => React.FunctionComponent<IStyledComponentProps>;
export declare const px: (val: string | number) => string;
export declare function getMergedStyles(styles: IStylesProps | undefined): IStylesOptions;
export { keyframes, styled };
