# frozen_string_literal: true

# Typed models for the MysqlVisualExplain SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# QueryAnalysi entity data model.
#
# @!attribute [rw] explainOutput
#   @return [Hash, nil]
#
# @!attribute [rw] mysqlVersion
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] recommendations
#   @return [Array, nil]
#
# @!attribute [rw] visualization
#   @return [Hash, nil]
QueryAnalysi = Struct.new(
  :explainOutput,
  :mysqlVersion,
  :query,
  :recommendations,
  :visualization,
  keyword_init: true
)

# Request payload for QueryAnalysi#create.
#
# @!attribute [rw] explainOutput
#   @return [Hash, nil]
#
# @!attribute [rw] mysqlVersion
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] recommendations
#   @return [Array, nil]
#
# @!attribute [rw] visualization
#   @return [Hash, nil]
QueryAnalysiCreateData = Struct.new(
  :explainOutput,
  :mysqlVersion,
  :query,
  :recommendations,
  :visualization,
  keyword_init: true
)

# SystemInfo entity data model.
#
# @!attribute [rw] version
#   @return [String, nil]
#
# @!attribute [rw] versionComment
#   @return [String, nil]
SystemInfo = Struct.new(
  :version,
  :versionComment,
  keyword_init: true
)

# Request payload for SystemInfo#load.
#
# @!attribute [rw] version
#   @return [String, nil]
#
# @!attribute [rw] versionComment
#   @return [String, nil]
SystemInfoLoadMatch = Struct.new(
  :version,
  :versionComment,
  keyword_init: true
)

