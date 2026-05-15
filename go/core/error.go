package core

type JsonplaceholderError struct {
	IsJsonplaceholderError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewJsonplaceholderError(code string, msg string, ctx *Context) *JsonplaceholderError {
	return &JsonplaceholderError{
		IsJsonplaceholderError: true,
		Sdk:              "Jsonplaceholder",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *JsonplaceholderError) Error() string {
	return e.Msg
}
