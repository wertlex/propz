export function get<A=any>(object: any, path: Array<string|number>, defaultValue?: A): A
export function set(object: any, path: Array<string|number>, value: any): any
export function getClosest(object: any, path: Array<string|number>): any
export function getDeepKeys(object: any, prefix: any): any[]