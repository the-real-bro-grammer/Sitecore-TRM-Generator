import {
    generateClass,
    generateFields,
    generateHeader,
    generateInterface,
    generateRegistration
} from '../templates';
import { Config } from '../types';

export const defaultConfig: Config = {
    includePaths: [
        '/sitecore/templates/Foundation/JSS Experience Accelerator',
        '/sitecore/templates/Feature/JSS Experience Accelerator'
    ],
    outputPath: '',
    introspectionPath: '',
    generateHeader,
    generateInterface,
    generateClass,
    generateFields,
    generateRegistration
};
