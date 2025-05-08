import fs from 'fs';
import { IntrospectionObjectType, IntrospectionSchema } from 'graphql';
import { GenerateModelsFromIntrospection } from '../templates';
import { Config } from '../types';

export function generateModels(config: Config) {
    const schema = getIntrospectionSchema(config.introspectionPath);
    const output = generateModelClasses(schema, config.includePaths);

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

function generateModelClasses(schema: IntrospectionSchema, paths: string[]): string {
    const types = schema.types.filter(
        (type: any) =>
            type.kind === 'OBJECT' &&
            type.description &&
            paths.some((path) => type.description.includes(path))
    );

    const template = GenerateModelsFromIntrospection(types as IntrospectionObjectType[]);

    return template;
}
