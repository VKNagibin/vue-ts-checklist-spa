export function shallowClone<Type>(item: Type): Type{
    return JSON.parse(JSON.stringify(item));
}