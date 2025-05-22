import { IntrospectionField } from 'graphql';
import { Config } from '../config';

export type GenerateFieldsProps = {
    config: Config;
    fields: readonly IntrospectionField[];
    withAccessModifier: boolean;
};
