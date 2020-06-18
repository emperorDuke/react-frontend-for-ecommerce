

export enum FetchConst {
    FETCH_IN_PROCESS = 'FETCH_IN_PROCESS',
    FETCH_SUCCESSFUL = 'FETCH_SUCCESSFUL',
    FETCH_FAILED = 'FETCH_FAILED'
}

export type FetchStatus = FetchConst | null;

export interface FetchOperationType {
    status: FetchStatus,
    error: object|string|null
}