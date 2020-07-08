/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { IComponentRuntime } from "@fluidframework/component-runtime-definitions";
import { ISharedMap } from "@fluidframework/map";
import { IComponentContext } from "@fluidframework/runtime-definitions";

declare module "@fluidframework/component-core-interfaces" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface IComponent extends Readonly<Partial<IProvideTestFluidComponent>> { }
}

export interface IProvideTestFluidComponent {
    readonly ITestFluidComponent: ITestFluidComponent;
}

export interface ITestFluidComponent extends IProvideTestFluidComponent {
    root: ISharedMap;
    readonly runtime: IComponentRuntime;
    readonly context: IComponentContext;
    getSharedObject<T = any>(id: string): Promise<T>;
}
