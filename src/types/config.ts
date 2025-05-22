import { GenerateClassProps } from './templates/generate-class-props';
import { GenerateFieldsProps } from './templates/generate-fields-props';
import { GenerateHeaderProps } from './templates/generate-header-props';
import { GenerateInterfaceProps } from './templates/generate-interface-props';
import { GenerateRegistrationProps } from './templates/generate-registration-props';

export type Config = {
    includePaths?: string[];
    outputPath: string;
    introspectionPath: string;
    generateHeader?: (props: GenerateHeaderProps) => string;
    generateInterface?: (props: GenerateInterfaceProps) => string;
    generateClass?: (props: GenerateClassProps) => string;
    generateFields?: (props: GenerateFieldsProps) => string;
    generateRegistration?: (props: GenerateRegistrationProps) => string;
};
