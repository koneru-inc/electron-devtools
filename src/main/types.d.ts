export interface InitDevToolsModuleParams {
    show?: boolean; // Should open devtools window after init
}

export interface LogItem {
    type: string;
    payload: string[];
}
