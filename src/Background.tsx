import React, { Component, Dispatch, SetStateAction } from 'react';
import { SuccessMessage } from './Body';

export interface BackgroundProps {
  url: string;
  handleStatus: (status: string, data: any) => boolean|void;
  setURL: Dispatch<SetStateAction<string>>
  setSuccess: Dispatch<SetStateAction<SuccessMessage|null>>
}

class Background extends Component<BackgroundProps> {
  render(): JSX.Element {
    return (
      <img src={this.props.url} alt={this.props.url ? 'Background image' : ''} onError={(e: any) => {
        if (this.props.url) {
          this.props.handleStatus('error', `Could not fetch the image: ${e.target.src}`);
          this.props.setURL('');
          this.props.setSuccess({ success: false, message: '' });
        }
      }}/>
    );
  }
}

export default Background;
