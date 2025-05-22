import { getClassName, getIdFromDescription } from '../lib/util/generation-helpers';
import { GenerateRegistrationProps } from '../types/templates/generate-registration-props';

export function generateRegistration(props: GenerateRegistrationProps): string | null {
    const id = getIdFromDescription(props.object.description);
    const className = getClassName(props.name);
    if (!id || !className) {
        return null;
    }

    return `TemplateFactory.RegisterTemplate('${id}', ${className});`;
}
