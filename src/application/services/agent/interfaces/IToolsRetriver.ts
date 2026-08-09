

export interface ToolDefinition {
    type: "function";
    function: ToolFunction;
}

export interface ToolFunction {
    name: string;
    description: string;
    parameters: Parameters;
}

export interface Parameters {
    type: "object";
    properties: Record<string, Property>;
    required: string[];
}

export interface Property {
    type: PropertyType;
    description: string;
}

export type PropertyType =
    | "string"
    | "number"
    | "integer"
    | "boolean"
    | "array"
    | "object";

export interface IToolsRetriver{
   
    retrieve(query:string):Promise<ToolDefinition[]>
}