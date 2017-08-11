// @flow
import crypto from 'crypto';
import type {Transformer, TransformOptions} from './jest-types.js';
import peg from 'pegjs';

const getCacheKey = (
  fileData: string,
  filePath: string,
  configString: string,
  options: TransformOptions,
): string => {
  return crypto.createHash('md5')
    .update(fileData)
    .update(configString)
    .digest('hex');
};

const transformer: Transformer = {
  getCacheKey,
  process: peg.generate,
};

module.exports = transformer;
