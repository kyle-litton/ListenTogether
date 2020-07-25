interface IScriptAttributes {
    async?: boolean;
    defer?: boolean;
    id?: string;
    source: string;
}
export declare const canUseDOM: () => boolean;
export declare const STATUS: {
    ERROR: string;
    IDLE: string;
    INITIALIZING: string;
    READY: string;
    RUNNING: string;
    UNSUPPORTED: string;
};
export declare const TYPE: {
    DEVICE: string;
    PLAYER: string;
    STATUS: string;
    TRACK: string;
};
export declare function getSpotifyURIType(uri: string): string;
export declare function isEqualArray(A?: any, B?: any): boolean;
export declare function loadScript(attributes: IScriptAttributes): Promise<any>;
export declare function validateURI(input: string): boolean;
export {};
