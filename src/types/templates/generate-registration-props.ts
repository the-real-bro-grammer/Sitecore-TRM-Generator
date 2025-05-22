import { IntrospectionObjectType } from 'graphql';
import { Config } from '../config';

export type GenerateRegistrationProps = {
    config: Config;
    object: IntrospectionObjectType;
    name: string;
};
