package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewQueryAnalysiEntityFunc func(client *MysqlVisualExplainSDK, entopts map[string]any) MysqlVisualExplainEntity

var NewSystemInfoEntityFunc func(client *MysqlVisualExplainSDK, entopts map[string]any) MysqlVisualExplainEntity

