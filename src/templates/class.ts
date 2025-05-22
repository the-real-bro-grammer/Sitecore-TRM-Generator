import { getClassName, getInterfaceName } from '../lib/util/generation-helpers';
import { GenerateClassProps } from '../types/templates/generate-class-props';
import { generateTemplateDetails } from './template-details';

export function generateClass(props: GenerateClassProps): string {
    return `${generateTemplateDetails(props.object)}
    export class ${getClassName(props.name)} extends ContentItem implements ${getInterfaceName(
        props.name
    )} {
        ${
            props.config.generateFields &&
            props.config.generateFields({
                config: props.config,
                fields: props.object.fields,
                withAccessModifier: true
            })
        }
        }`;
}
