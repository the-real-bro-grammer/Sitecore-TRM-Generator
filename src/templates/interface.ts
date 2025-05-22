import { getInterfaceName } from '../lib/util/generation-helpers';
import { GenerateInterfaceProps } from '../types/templates/generate-interface-props';
import { generateTemplateDetails } from './template-details';

export function generateInterface(props: GenerateInterfaceProps): string {
    return `${generateTemplateDetails(props.object)}
    export interface ${getInterfaceName(props.name)} extends IContentItem {
    ${
        props.config.generateFields &&
        props.config.generateFields({
            config: props.config,
            fields: props.object.fields,
            withAccessModifier: false
        })
    }
    }`;
}
