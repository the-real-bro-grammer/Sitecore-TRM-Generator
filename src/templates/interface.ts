import { IntrospectionObjectType } from 'graphql';
import { getInterfaceName } from '../lib/util/generation-helpers';
import { GenerateFieldsFromIntrospection } from './fields';

export function generateInterface(object: IntrospectionObjectType): string {
    return `export interface ${getInterfaceName(object.name)} extends IContentItem {
    ${GenerateFieldsFromIntrospection(object.fields)}
    }`;
}
