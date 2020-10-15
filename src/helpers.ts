import { version } from '../package.json';

const proxyURL = 'https://cors-anywhere.herokuapp.com/';
const unsplash = 'https://source.unsplash.com/random/1920x1080';
const headers = {
  'X-Requested-With': 'Desktop Changer',
  'User-Agent': `acollierr17/desktop-changer (v${version}, https:github.com/acollierr17/desktop-changer`
};

export const getRandomDesktopImage = async (): Promise<string> => {
  return fetch(unsplash, { headers })
    .then(res => res.url);
};

export const getImageBuffer = async (url: string): Promise<Buffer> => {
  const base64 = await getBase64FromString(url, true);
  return Buffer.from(base64, 'base64');
};

export const getBase64FromString = async (url: string, stripped: boolean = false): Promise<string> => {
  const buffer = await fetch(proxyURL + url, { headers }).then(res => res.arrayBuffer());
  const bytes = [].slice.call(new Uint8Array(buffer));
  const binary = [].map.call(bytes, (byte: number) => {
    return String.fromCharCode(byte);
  }).join('');
  let base64 = [
    'data:image/jpeg;base64,',
    btoa(binary)
  ].join('');

  if (stripped) base64 = base64.replace(/^data:image\/\w+;base64,/, '');
  return base64;
};
