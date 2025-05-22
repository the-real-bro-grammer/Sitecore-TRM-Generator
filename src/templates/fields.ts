import { IntrospectionField, IntrospectionOutputTypeRef } from 'graphql';
import { getFieldName } from '../lib';
import { reservedFieldNames } from '../lib/util/reserved-field-names';
import { GenerateFieldsProps } from '../types/templates/generate-fields-props';

export function generateFields(props: GenerateFieldsProps): string {
    const output = props.fields.map((field) =>
        GenerateFieldFromIntrospection(field, props.withAccessModifier)
    );

    return output.join('');
}

function GenerateFieldFromIntrospection(
    field: IntrospectionField,
    withAccessModifier: boolean
): string | void {
    const fieldName = getFieldName(field.name);

    if (reservedFieldNames.includes(field.name) || reservedFieldNames.includes(fieldName)) {
        return;
    }

    const type = GenerateFieldType(field.type);
    if (withAccessModifier) {
        return `public ${fieldName}: ${type};`;
    }

    return `${fieldName}: ${type};`;
}

function GenerateFieldType(type: IntrospectionOutputTypeRef): string {
    switch (type.kind) {
        case 'OBJECT':
            return type.name;
        default:
            return 'any';
    }
}
