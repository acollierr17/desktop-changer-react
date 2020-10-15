import React, { Component } from 'react';

import Message from 'trunx/component/Message';
import Delete from 'trunx/component/Delete';
import { SuccessMessage } from './Body';

export interface ErrorProps {
  error: { message: string }|boolean;
  handleStatus: (status: string, data: any) => boolean|void;
}

export interface SuccessProps {
  success: SuccessMessage;
  handleStatus: (status: string, data: any) => boolean|void;
}

export class ErrorComponent extends Component<ErrorProps> {
  render(): JSX.Element {
    if (this.props.error) {
      return (
        <Message isDanger>
          <Message.Header>
            <p>An error has occurred</p>
            <Delete aria-label="delete" onClick={() => this.props.handleStatus('error', null)}/>
          </Message.Header>
          <Message.Body>{typeof this.props.error !== 'boolean' ? this.props.error?.message ?? this.props.error : 'No message was provided'}</Message.Body>
        </Message>
      );
    } else {
      return (
        <div/>
      );
    }
  }
}

export class SuccessComponent extends Component<SuccessProps> {
  render(): JSX.Element {
    if (this.props.success.success) {
      return (
        <Message isSuccess>
          <Message.Header>
            <p>Success</p>
            <Delete aria-label="delete"
              onClick={() => this.props.handleStatus('success', { success: false, message: '' })}/>
          </Message.Header>
          <Message.Body>{this.props.success?.message ? this.props.success.message : 'Action successful.'}</Message.Body>
        </Message>
      );
    } else {
      return (
        <div/>
      );
    }
  }
}
