export function getInterfaceName(name: string): string {
    return `I_${sanitizeName(name)}Item`;
}

export function getClassName(name: string): string {
    return `${sanitizeName(name)}Item`;
}

export function getFieldName(name: string): string {
    return sanitizeName(name);
}

export function getIdFromDescription(description: string): string {
    const pattern =
        /\{([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12})\}/;
    const match = description.match(pattern);

    return match ? match[1].replace(/-/g, '').toUpperCase() : null;
}

export function getNameFromDescription(description: string): string {
    const match = description.match(/^(.*?)\s*\(ID:\s*\{[0-9A-Fa-f-]{36}\}\)/);
    return match ? match[1].trim() : null;
}

function sanitizeName(name: string): string {
    // Remove known prefixes
    name = name.replace(/^C___|^C__/, '');

    // Remove underscore followed by 32 hex characters (a GUID without dashes)
    name = name.replace(/_[0-9a-fA-F]{32}$/, '');

    return name;
}
