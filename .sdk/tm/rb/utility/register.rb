# MysqlVisualExplain SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MysqlVisualExplainUtility.registrar = ->(u) {
  u.clean = MysqlVisualExplainUtilities::Clean
  u.done = MysqlVisualExplainUtilities::Done
  u.make_error = MysqlVisualExplainUtilities::MakeError
  u.feature_add = MysqlVisualExplainUtilities::FeatureAdd
  u.feature_hook = MysqlVisualExplainUtilities::FeatureHook
  u.feature_init = MysqlVisualExplainUtilities::FeatureInit
  u.fetcher = MysqlVisualExplainUtilities::Fetcher
  u.make_fetch_def = MysqlVisualExplainUtilities::MakeFetchDef
  u.make_context = MysqlVisualExplainUtilities::MakeContext
  u.make_options = MysqlVisualExplainUtilities::MakeOptions
  u.make_request = MysqlVisualExplainUtilities::MakeRequest
  u.make_response = MysqlVisualExplainUtilities::MakeResponse
  u.make_result = MysqlVisualExplainUtilities::MakeResult
  u.make_point = MysqlVisualExplainUtilities::MakePoint
  u.make_spec = MysqlVisualExplainUtilities::MakeSpec
  u.make_url = MysqlVisualExplainUtilities::MakeUrl
  u.param = MysqlVisualExplainUtilities::Param
  u.prepare_auth = MysqlVisualExplainUtilities::PrepareAuth
  u.prepare_body = MysqlVisualExplainUtilities::PrepareBody
  u.prepare_headers = MysqlVisualExplainUtilities::PrepareHeaders
  u.prepare_method = MysqlVisualExplainUtilities::PrepareMethod
  u.prepare_params = MysqlVisualExplainUtilities::PrepareParams
  u.prepare_path = MysqlVisualExplainUtilities::PreparePath
  u.prepare_query = MysqlVisualExplainUtilities::PrepareQuery
  u.result_basic = MysqlVisualExplainUtilities::ResultBasic
  u.result_body = MysqlVisualExplainUtilities::ResultBody
  u.result_headers = MysqlVisualExplainUtilities::ResultHeaders
  u.transform_request = MysqlVisualExplainUtilities::TransformRequest
  u.transform_response = MysqlVisualExplainUtilities::TransformResponse
}
