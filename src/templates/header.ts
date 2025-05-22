import { GenerateHeaderProps } from '../types/templates/generate-header-props';

export function generateHeader(props: GenerateHeaderProps): string {
    return `   
import { ImageField, LinkField, TextField, RichTextField } from "@sitecore-jss/sitecore-jss-nextjs";
import {
    CheckboxField,
    ContentItem,
    IContentItem,
    IntegerField,
    LookupField,
    MultilistField,
    NameValueListField,
    NumberField,
    RawItem,
    TemplateFactory,
} from 'sitecore-trm';

type TemplateType = new (item: RawItem) => IContentItem;`;
}
