export interface QueryAnalysi {
    explainOutput?: Record<string, any>;
    mysqlVersion?: string;
    query: string;
    recommendations?: any[];
    visualization?: Record<string, any>;
}
export interface QueryAnalysiCreateData {
    mysqlVersion?: string;
    query: string;
}
export interface SystemInfo {
    version?: string;
    versionComment?: string;
}
export interface SystemInfoLoadMatch {
    version?: string;
    versionComment?: string;
}
