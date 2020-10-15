import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from 'trunx/component/Input';
import Field from 'trunx/component/Field';
import Button from 'trunx/component/Button';
import Control from 'trunx/component/Control';
import Section from 'trunx/component/Section';
import app from 'electron';
import path from 'path';
import wallpaper from 'wallpaper';
const fsn = app.remote.require('fs-nextra');

import Header from './Header';
import Footer from './Footer';
import { ErrorComponent, SuccessComponent } from './Status';
import { getImageBuffer, getRandomDesktopImage } from './helpers';
import Background from './Background';

export interface SuccessMessage {
  success?: boolean;
  message?: string;
}

const Body = (): JSX.Element => {
  const [url, setURL] = useState('');
  const [validURL, setValidURL] = useState(false);
  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState<SuccessMessage|null>({
    success: false,
    message: ''
  });
  const [error, setError] = useState<{ message: string }|boolean>(false);
  const [loading, setLoading] = useState(false);

  const verifyImage = (event: any): void => {
    setURL(event.target.value);
    const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    const valid = regex.test(event.target.value);
    if (valid) setValidURL(true);
  };

  const handleLoading = (): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleStatus = (status: string, data: any): void|boolean => {
    switch (status) {
      case 'success': return setSuccess(data);
      case 'error': return setError(data);
      default: return false;
    }
  };

  const updateImage = (event: any): void => {
    handleLoading();
    if (active && validURL) {
      setURL('');
      setValidURL(false);
      setActive(false);
      setError(false);
      setSuccess({ success: false, message: '' });
    }

    if (!active && validURL) {
      setURL(url);
      setActive(true);
      handleStatus('success', { success: true, message: 'Successfully imported the background.' });
    }
  };

  const getLuckyImage = async (): Promise<void> => {
    try {
      handleLoading();
      const image = await getRandomDesktopImage();
      setURL(image);
      setValidURL(true);
      setActive(true);
      handleStatus('success', { success: true, message: 'Successfully imported a random desktop background.' });
    } catch (e) {
      handleStatus('error', e);
      console.log('An error has occurred:', e);
    }
  };

  const setBackground = async (event: any): Promise<void> => {
    try {
      setLoading(true);
      const imageBuffer = await getImageBuffer(url);
      const filename = `wallpaper-${Date.now()}.png`;
      const directory = path.join(app.remote.app.getAppPath(), 'wallpapers');
      const picturePath = path.normalize(path.join(directory, filename));

      const { filePath, canceled } = await app.remote.dialog.showSaveDialog({
        title: 'Select the file path to save your background',
        buttonLabel: 'Save',
        defaultPath: picturePath,
        filters: [
          {
            name: 'Image files',
            extensions: ['jpg', 'jpeg', 'png']
          }
        ]
      });

      if (canceled) return setLoading(false);
      await fsn.writeFileAtomic(filePath!, imageBuffer, 'base64');
      await wallpaper.set(filePath!, { scale: 'stretch' });
      setLoading(false);
      handleStatus('success', { success: true, message: 'The current image has successfully been saved and set as the desktop background.' });
    } catch (e) {
      let message: string = e?.message ?? e;
      if (message === 'Failed to fetch') message = `Failed to fetch the image: ${url}`;
      handleStatus('error', message);
      console.log('An error has occurred:', e);
      setLoading(false);
      return;
    }
  };

  return (
    <>
      <Section className="flex-container">
        <Header />
        <br/>
        <div>
          <Field className="control has-icons-left">
            <Control className="has-icons-left">
              <Input
                className="has-tooltip-danger"
                placeholder="https://example.com/image.png"
                type="text"
                autoFocus={true}
                onChange={verifyImage}
                value={url}
                disabled={active}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon="images" />
              </span>
            </Control>
          </Field>
          <Field className="buttons is-grouped">
            <Button
              className={active ? 'is-danger' : 'is-success'}
              disabled={!validURL}
              onClick={updateImage}
              isLoading={loading}>
              {active ? '🗑 Clear' : '📥 Import'}
            </Button>
            <Button isWarning onClick={setBackground} disabled={!active} isLoading={loading}>📌 Set Background</Button>
            <Button isInfo onClick={getLuckyImage} isLoading={loading}>🍪 Cookie</Button>
          </Field>
          <Footer />
          <hr/>
        </div>

        <ErrorComponent error={error} handleStatus={handleStatus} />
        <SuccessComponent success={success!} handleStatus={handleStatus} />

        <Background url={active ? url : ''} handleStatus={handleStatus} setURL={setURL} setSuccess={setSuccess} />
      </Section>
    </>
  );
};

export default Body;
