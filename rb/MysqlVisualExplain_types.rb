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
# @!attribute [rw] explain_output
#   @return [Hash, nil]
#
# @!attribute [rw] mysql_version
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] recommendation
#   @return [Array, nil]
#
# @!attribute [rw] visualization
#   @return [Hash, nil]
QueryAnalysi = Struct.new(
  :explain_output,
  :mysql_version,
  :query,
  :recommendation,
  :visualization,
  keyword_init: true
)

# Request payload for QueryAnalysi#create.
#
# @!attribute [rw] explain_output
#   @return [Hash, nil]
#
# @!attribute [rw] mysql_version
#   @return [String, nil]
#
# @!attribute [rw] query
#   @return [String]
#
# @!attribute [rw] recommendation
#   @return [Array, nil]
#
# @!attribute [rw] visualization
#   @return [Hash, nil]
QueryAnalysiCreateData = Struct.new(
  :explain_output,
  :mysql_version,
  :query,
  :recommendation,
  :visualization,
  keyword_init: true
)

# SystemInfo entity data model.
#
# @!attribute [rw] version
#   @return [String, nil]
#
# @!attribute [rw] version_comment
#   @return [String, nil]
SystemInfo = Struct.new(
  :version,
  :version_comment,
  keyword_init: true
)

# Request payload for SystemInfo#load.
#
# @!attribute [rw] version
#   @return [String, nil]
#
# @!attribute [rw] version_comment
#   @return [String, nil]
SystemInfoLoadMatch = Struct.new(
  :version,
  :version_comment,
  keyword_init: true
)

