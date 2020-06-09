import * as T from "./@types";

export function attributeRequest(payload: string): T.AttributeRequest {
  return {
    type: T.attribute.ATTRIBUTE_REQUEST,
    payload
  };
}

export function attributeSuccess(
  payload: Array<T.AttributeType>
): T.AttributeSuccess {
  return {
    type: T.attribute.ATTRIBUTE_SUCCESS,
    payload
  };
}

export function attributeFailure(payload: string): T.AttributeFailure {
  return {
    type: T.attribute.ATTRIBUTE_ERROR,
    payload
  };
}

export * from "./@types";
