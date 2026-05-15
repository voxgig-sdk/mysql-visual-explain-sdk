package voxgigmysqlvisualexplainsdk

import (
	"github.com/voxgig-sdk/mysql-visual-explain-sdk/core"
	"github.com/voxgig-sdk/mysql-visual-explain-sdk/entity"
	"github.com/voxgig-sdk/mysql-visual-explain-sdk/feature"
	_ "github.com/voxgig-sdk/mysql-visual-explain-sdk/utility"
)

// Type aliases preserve external API.
type MysqlVisualExplainSDK = core.MysqlVisualExplainSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MysqlVisualExplainEntity = core.MysqlVisualExplainEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MysqlVisualExplainError = core.MysqlVisualExplainError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewQueryAnalysiEntityFunc = func(client *core.MysqlVisualExplainSDK, entopts map[string]any) core.MysqlVisualExplainEntity {
		return entity.NewQueryAnalysiEntity(client, entopts)
	}
	core.NewSystemInfoEntityFunc = func(client *core.MysqlVisualExplainSDK, entopts map[string]any) core.MysqlVisualExplainEntity {
		return entity.NewSystemInfoEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMysqlVisualExplainSDK = core.NewMysqlVisualExplainSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
