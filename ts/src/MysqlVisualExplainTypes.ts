// Typed models for the MysqlVisualExplain SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface QueryAnalysi {
  explain_output?: Record<string, any>
  mysql_version?: string
  query: string
  recommendation?: any[]
  visualization?: Record<string, any>
}

export type QueryAnalysiCreateData = Partial<QueryAnalysi>

export interface SystemInfo {
  version?: string
  version_comment?: string
}

export type SystemInfoLoadMatch = Partial<SystemInfo>

