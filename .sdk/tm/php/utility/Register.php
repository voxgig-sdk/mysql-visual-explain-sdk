<?php
declare(strict_types=1);

// MysqlVisualExplain SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

MysqlVisualExplainUtility::setRegistrar(function (MysqlVisualExplainUtility $u): void {
    $u->clean = [MysqlVisualExplainClean::class, 'call'];
    $u->done = [MysqlVisualExplainDone::class, 'call'];
    $u->make_error = [MysqlVisualExplainMakeError::class, 'call'];
    $u->feature_add = [MysqlVisualExplainFeatureAdd::class, 'call'];
    $u->feature_hook = [MysqlVisualExplainFeatureHook::class, 'call'];
    $u->feature_init = [MysqlVisualExplainFeatureInit::class, 'call'];
    $u->fetcher = [MysqlVisualExplainFetcher::class, 'call'];
    $u->make_fetch_def = [MysqlVisualExplainMakeFetchDef::class, 'call'];
    $u->make_context = [MysqlVisualExplainMakeContext::class, 'call'];
    $u->make_options = [MysqlVisualExplainMakeOptions::class, 'call'];
    $u->make_request = [MysqlVisualExplainMakeRequest::class, 'call'];
    $u->make_response = [MysqlVisualExplainMakeResponse::class, 'call'];
    $u->make_result = [MysqlVisualExplainMakeResult::class, 'call'];
    $u->make_point = [MysqlVisualExplainMakePoint::class, 'call'];
    $u->make_spec = [MysqlVisualExplainMakeSpec::class, 'call'];
    $u->make_url = [MysqlVisualExplainMakeUrl::class, 'call'];
    $u->param = [MysqlVisualExplainParam::class, 'call'];
    $u->prepare_auth = [MysqlVisualExplainPrepareAuth::class, 'call'];
    $u->prepare_body = [MysqlVisualExplainPrepareBody::class, 'call'];
    $u->prepare_headers = [MysqlVisualExplainPrepareHeaders::class, 'call'];
    $u->prepare_method = [MysqlVisualExplainPrepareMethod::class, 'call'];
    $u->prepare_params = [MysqlVisualExplainPrepareParams::class, 'call'];
    $u->prepare_path = [MysqlVisualExplainPreparePath::class, 'call'];
    $u->prepare_query = [MysqlVisualExplainPrepareQuery::class, 'call'];
    $u->result_basic = [MysqlVisualExplainResultBasic::class, 'call'];
    $u->result_body = [MysqlVisualExplainResultBody::class, 'call'];
    $u->result_headers = [MysqlVisualExplainResultHeaders::class, 'call'];
    $u->transform_request = [MysqlVisualExplainTransformRequest::class, 'call'];
    $u->transform_response = [MysqlVisualExplainTransformResponse::class, 'call'];
});
