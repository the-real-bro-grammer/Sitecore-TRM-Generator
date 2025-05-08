import { IntrospectionObjectType } from 'graphql';
import { getClassName, getIdFromDescription } from '../lib/util/generation-helpers';

export function generateRegistration(object: IntrospectionObjectType): string | null {
    const id = getIdFromDescription(object.description);
    const className = getClassName(object.name);
    if (!id || !className) {
        return null;
    }

    return `TemplateFactory.RegisterTemplate('${id}', ${className});`;
}
