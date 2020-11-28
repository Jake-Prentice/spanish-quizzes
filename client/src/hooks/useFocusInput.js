import React, {useRef, useEffect} from 'react'

const useFocusInput = () => {
    const inputRef = useRef(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus({preventScroll: true})
        }
    })

    return inputRef
}

export default useFocusInput;