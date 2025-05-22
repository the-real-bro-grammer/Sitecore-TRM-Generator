import { IntrospectionObjectType } from 'graphql';
import { Config } from '../config';

export type GenerateInterfaceProps = {
    config: Config;
    object: IntrospectionObjectType;
    name: string;
};
