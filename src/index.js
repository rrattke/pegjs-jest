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

const process = (
  sourceText: string,
  sourcePath: Path,
  config: Config,
  options?: TransformOptions,
): string => {
  return `module.exports = ${peg.generate(sourceText, {output: 'source'})}`;
};

const transformer: Transformer = {
  getCacheKey,
  process,
};

module.exports = transformer;
