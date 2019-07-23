/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { loadIFramedPragueComponent, loadPragueComponent } from "@prague/tiny-web-host";
import * as React from "react";

export { isPragueURL, isSpoUrl, loadPragueComponent } from "@prague/tiny-web-host";

export interface ILoaderProps {

  clientId?: string;

  clientSecret?: string;

  iframe?: boolean;

  /**
   * URL of the Prague component
   */
  url: string;

  /**
   * The SPO AppId. If no SPO AppId available, a consistent and descriptive app name is acceptable
   */
  appId: string;

  /**
   * Function that either returns an SPO token, or a Routerlicious tenant token
   */
  getToken(): Promise<string>;
}

export class FluidLoader extends React.Component<ILoaderProps, any> {
  private readonly divRef: React.RefObject<HTMLDivElement>;

  constructor(props: ILoaderProps) {
    super(props);
    this.divRef = React.createRef();
  }

  public async componentDidMount() {

    if (this.props.iframe) {
       loadIFramedPragueComponent(
        this.props.url,
        this.props.getToken,
        this.divRef.current,
        // this.props.appId,
        this.props.clientId ? this.props.clientId : "",
        this.props.clientSecret ? this.props.clientSecret : "",
        "reactLoader",
       );
    } else {
      loadPragueComponent(
        this.props.url,
        this.props.getToken,
        this.divRef.current,
        this.props.appId,
        this.props.clientId ? this.props.clientId : "",
        this.props.clientSecret ? this.props.clientSecret : "",
      );
    }
  }

  public render() {
    return (
      <div>
        <div ref={this.divRef} />
      </div>
    );
  }
}
