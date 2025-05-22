import { IntrospectionObjectType } from 'graphql';
import { sanitizeName } from '../lib';
import { Config } from '../types';

export function GenerateModelsFromIntrospection(
    introspectionTypes: IntrospectionObjectType[],
    config: Config
): string {
    let interfaces: string[] = [];
    let classes: string[] = [];
    let templateRegistrations: string[] = [];
    const names = {};

    introspectionTypes.forEach((type) => {
        let proposedName = sanitizeName(type.name);
        let increment = 1;

        while (names[proposedName]) {
            proposedName = `${proposedName}${increment}`;
        }

        increment = 1;

        if (config.generateInterface) {
            interfaces.push(config.generateInterface({ config, name: proposedName, object: type }));
        }

        if (config.generateClass) {
            classes.push(config.generateClass({ config, name: proposedName, object: type }));
        }

        if (config.generateRegistration) {
            templateRegistrations.push(
                config.generateRegistration({ config, name: proposedName, object: type })
            );
        }

        names[proposedName] = true;
    });

    return GenerateTemplate(config, interfaces, classes, templateRegistrations);
}

function GenerateTemplate(
    config: Config,
    interfaces: string[],
    classes: string[],
    templateRegistrations: string[]
): string {
    return `
    ${config.generateHeader && config.generateHeader({ config })}
    ${interfaces.join('\n')}
    ${classes.join('\n')}    
    
    export function RegisterTemplates() {
        ${templateRegistrations.join('\n')}
    }
    `;
}
