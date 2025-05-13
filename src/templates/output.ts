import { IntrospectionObjectType } from 'graphql';
import { generateClass } from './class';
import { generateInterface } from './interface';
import { generateRegistration } from './registration';

export function GenerateModelsFromIntrospection(
    introspectionTypes: IntrospectionObjectType[]
): string {
    let interfaces: string[] = [];
    let classes: string[] = [];
    let templateRegistrations: string[] = [];

    introspectionTypes.forEach((type) => {
        interfaces.push(generateInterface(type));
        classes.push(generateClass(type));
        templateRegistrations.push(generateRegistration(type));
    });

    return GenerateTemplate(interfaces, classes, templateRegistrations);
}

function GenerateTemplate(
    interfaces: string[],
    classes: string[],
    templateRegistrations: string[]
): string {
    return `
    import { ImageField, LinkField, TextField, RichTextField } from "@sitecore-jss/sitecore-jss-nextjs";
    import {
        CheckboxField,
        ContentItem,
        FieldMetadata,
        IContentItem,
        LookupField,
        MultilistField,
        NameValueListField,
        NumberField,
        RawItem,
        TemplateFactory,
    } from 'sitecore-trm';

    type TemplateType = new (item: RawItem) => IContentItem;
    
    ${interfaces.join('\n')}
    ${classes.join('\n')}    
    
    export function RegisterTemplates() {
        ${templateRegistrations.join('\n')}
    }
    `;
}
