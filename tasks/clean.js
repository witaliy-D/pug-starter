import del from 'del';
import {config}from '../config.js';

const dir = config.dir;

export const clean = () => {
  return del(dir.dist);
};

export const cleanImgs = () => {
  return del(dir.clean.imgs);
};

export const cleanFonts = () => {
  return del(dir.clean.fonts);
};

export const cleanPages = () => {
  return del(dir.clean.pages);
};

