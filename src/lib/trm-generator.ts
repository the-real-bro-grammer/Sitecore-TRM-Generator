import fs from 'fs';
import { IntrospectionObjectType, IntrospectionSchema } from 'graphql';
import { GenerateModelsFromIntrospection } from '../templates';
import { Config } from '../types';
import { defaultConfig } from './default-config';

export function generateModels(configOverride: Config) {
    const config: Config = {
        ...defaultConfig,
        ...configOverride
    };

    const schema = getIntrospectionSchema(config.introspectionPath);
    const output = generateModelClasses(schema, config);

    fs.writeFile(config.outputPath, output, (err) => {
        if (err) {
            console.error('Error writing Generating models to file', err);
            return;
        }

        console.log('Models successfully generated!');
    });
}

function getIntrospectionSchema(introspectionPath: string): IntrospectionSchema {
    let introspectionResult: {
        __schema: IntrospectionSchema;
    } = {
        __schema: undefined
    };

    try {
        introspectionResult = require(introspectionPath) as {
            __schema: IntrospectionSchema;
        };
    } catch (e) {
        console.error(
            'Unable to require JSS config. Ensure `jss setup` has been run, and the app has been started at least once after setup.'
        );
        console.error(e);
        process.exit(1);
    }

    return introspectionResult.__schema;
}

function generateModelClasses(schema: IntrospectionSchema, config: Config): string {
    const types = schema.types.filter(
        (type: any) =>
            type.kind === 'OBJECT' &&
            type.description &&
            config.includePaths.some((path) => type.description.includes(path))
    );

    const template = GenerateModelsFromIntrospection(types as IntrospectionObjectType[], config);

    return template;
}
