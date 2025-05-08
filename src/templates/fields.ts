import { IntrospectionField, IntrospectionOutputTypeRef } from 'graphql';
import { getFieldName, getIdFromDescription, getNameFromDescription } from '../lib';
import { reservedFieldNames } from '../lib/util/reserved-field-names';

export function GenerateFieldsFromIntrospection(
    fields: readonly IntrospectionField[],
    asClass: boolean = false
): string {
    const output = fields.map((field) => GenerateFieldFromIntrospection(field, asClass));

    return output.join('');
}

function GenerateFieldFromIntrospection(
    field: IntrospectionField,
    asClass: boolean
): string | void {
    const fieldName = getFieldName(field.name);

    if (reservedFieldNames.includes(field.name) || reservedFieldNames.includes(fieldName)) {
        return;
    }

    const type = GenerateFieldType(field.type);
    if (asClass) {
        return `${GenerateFieldMeta(field)}
        public ${fieldName}: ${type};`;
    }

    return `${fieldName}: ${type};`;
}

function GenerateFieldMeta(field: IntrospectionField): string {
    return `@FieldMetadata('${getNameFromDescription(field.description)}', '${getIdFromDescription(
        field.description
    )}', '${field.description}')`;
}

function GenerateFieldType(type: IntrospectionOutputTypeRef): string {
    switch (type.kind) {
        case 'OBJECT':
            return type.name;
        default:
            return 'any';
    }
}
