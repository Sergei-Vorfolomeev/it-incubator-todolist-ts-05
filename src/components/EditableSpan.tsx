import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {changeTaskTitleAC} from "../state/tasksReducer";

type EditableSpanPropsType = {
    title: string
    callBack: (newEditedTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [newEditedTitle, setNewEditedTitle] = useState(props.title)
    const [change, setChange] = useState(false)

    const transformSpan = () => {
        setChange(!change)
        callBack()
    }
    const onChangeInputTransformHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewEditedTitle(event.currentTarget.value)
    }
    const onEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            transformSpan()
        }
    }
    const callBack = () => {
        props.callBack(newEditedTitle)
    }

    return (
        <>
            {change
                ? <input
                    onBlur={transformSpan}
                    autoFocus
                    onChange={onChangeInputTransformHandler}
                    onKeyDown={onEnterHandler}/>
                : <span onDoubleClick={transformSpan}>{newEditedTitle}</span>}
        </>
    );
};

