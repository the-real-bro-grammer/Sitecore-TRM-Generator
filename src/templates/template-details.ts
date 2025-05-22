import { IntrospectionObjectType } from 'graphql';
import { getIdFromDescription, getPathFromDescription } from '../lib';

export function generateTemplateDetails(object: IntrospectionObjectType): string {
    return `
/*
    Template Name: ${object.name}
    Template ID: ${getIdFromDescription(object.description)}
    Path: ${getPathFromDescription(object.description)}
*/`;
}
