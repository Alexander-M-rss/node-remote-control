import { Region, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';
import { IRegion } from './type';

export const printScreenCommand = 'prnt_scrn';
const SCREENSHOT_WIDTH = 200;
const SCREENSHOT_HEIGHT = 200;
const SCREENSHOT_HALF_WIDTH = SCREENSHOT_WIDTH / 2;
const SCREENSHOT_HALF_HEIGHT = SCREENSHOT_HEIGHT / 2;

const calculateRegion = async (x: number, y: number): Promise<IRegion> => {
  const screenWidth = await screen.width();
  const screenHeight = await screen.height();
  let left = x - SCREENSHOT_HALF_WIDTH;
  let top = y - SCREENSHOT_HALF_HEIGHT;

  left = left < 0 ? 0 : left;
  top = top < 0 ? 0 : top;
  left = x + SCREENSHOT_HALF_WIDTH > screenWidth ? screenWidth - SCREENSHOT_WIDTH : left;
  top = y + SCREENSHOT_HALF_HEIGHT > screenHeight ? screenHeight - SCREENSHOT_HEIGHT : top;

  return { left, top, width: SCREENSHOT_WIDTH, height: SCREENSHOT_HEIGHT };
};

export const printScreen = async (x: number, y: number) => {
  const { left, top, width, height } = await calculateRegion(x, y);

  const region = new Region(left, top, width, height);

  const bitmap = await (await screen.grabRegion(region)).toRGB();
  const img = new Jimp(bitmap);
  const base64 = await img.getBase64Async(img.getMIME());

  return `${printScreenCommand} ${base64.substring(base64.indexOf(',') + 1)}`;
};
