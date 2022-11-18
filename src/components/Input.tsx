import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    newTitle: string
    setNewTitle: (newTitle:string) => void
    error: string | null
    setError: (error:string | null) => void
    callBack: () => void
}

export const Input = (props:InputPropsType) => {
    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        props.setError(null)
        props.setNewTitle(event.currentTarget.value)
    }
    const onEnterHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.callBack()
        }
    }
    return (
        <input
            value={props.newTitle}
            onChange={onChangeHandler}
            onKeyDown={onEnterHandler}
        />
    );
};
