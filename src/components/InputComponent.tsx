import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type InputComponentPropsType = {
    callBack: (newTitle: string) => void
}

export const InputComponent = (props: InputComponentPropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
        setError(null)
    }
    const onEnterHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && newTitle !== '') {
            props.callBack(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onClickHandler = () => {
        if (newTitle !== '') {
            props.callBack(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <>
            <input value={newTitle}
                   onChange={onChangeInputHandler}
                   onKeyDown={onEnterHandler}/>
            <button onClick={onClickHandler}>Add</button>
            {error && <div>{error}</div>}
        </>
    );

};

