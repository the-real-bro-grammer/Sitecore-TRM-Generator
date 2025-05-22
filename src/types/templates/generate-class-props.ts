import { IntrospectionObjectType } from 'graphql';
import { Config } from '../config';

export type GenerateClassProps = {
    config: Config;
    object: IntrospectionObjectType;
    name: string;
};
