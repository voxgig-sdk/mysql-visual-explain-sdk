// Typed models for the MysqlVisualExplain SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface QueryAnalysi {
  explainOutput?: Record<string, any>
  mysqlVersion?: string
  query: string
  recommendations?: any[]
  visualization?: Record<string, any>
}

export interface QueryAnalysiCreateData {
  mysqlVersion?: string
  query: string
}

export interface SystemInfo {
  version?: string
  versionComment?: string
}

export interface SystemInfoLoadMatch {
  version?: string
  versionComment?: string
}

