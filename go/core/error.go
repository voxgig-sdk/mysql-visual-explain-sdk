package core

type MysqlVisualExplainError struct {
	IsMysqlVisualExplainError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMysqlVisualExplainError(code string, msg string, ctx *Context) *MysqlVisualExplainError {
	return &MysqlVisualExplainError{
		IsMysqlVisualExplainError: true,
		Sdk:              "MysqlVisualExplain",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MysqlVisualExplainError) Error() string {
	return e.Msg
}
