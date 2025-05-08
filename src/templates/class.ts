import { IntrospectionObjectType } from 'graphql';
import { getClassName, getInterfaceName } from '../lib/util/generation-helpers';
import { GenerateFieldsFromIntrospection } from './fields';

export function generateClass(object: IntrospectionObjectType): string {
    return `export class ${getClassName(
        object.name
    )} extends ContentItem implements ${getInterfaceName(object.name)} {
        ${GenerateFieldsFromIntrospection(object.fields, true)}
        }`;
}
