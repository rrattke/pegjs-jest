import * as crypto from 'crypto';
import * as path from "path";
import * as fs from "fs";
import { Config } from '@jest/types';
import { CacheKeyOptions, TransformOptions } from '@jest/transform/build/types';
import { generate, OutputFormatAmdCommonjs, OutputFormatUmd, OutputFormatBare, OutputFormatGlobals } from 'pegjs';

type OutputFormat = OutputFormatAmdCommonjs | OutputFormatUmd | OutputFormatGlobals | OutputFormatBare;

export const getCacheKey = (
  fileData: string,
  _filePath: string,
  configString: string,
  _options: CacheKeyOptions,
): string => crypto.createHash('md5')
  .update(fileData)
  .update(configString)
  .digest('hex');

export const process = (
  sourceText: string,
  sourcePath: Config.Path,
  _config: Config.ProjectConfig,
  _options?: TransformOptions,
): string => {
  let configPath = getConfigPath(sourcePath);
  let config: OutputFormat = getConfig(configPath);
  return generate(sourceText, <any>config).toString();
}

function getConfigPath(sourcePath: string) {
  let { dir, name } = path.parse(sourcePath);
  let configPath = path.join(dir, name + ".config.json");
  return configPath;
}

function getConfig(configPath: string): OutputFormat {
  let config: OutputFormat = { output: "source", format: "commonjs" };
  if (fs.existsSync(configPath)) {
    var content = fs.readFileSync(configPath).toString();
    config = { ...config, ...JSON.parse(content) };
  }
  return config;
}


