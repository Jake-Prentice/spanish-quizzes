import { useState, useEffect } from 'react';

function useSimpleAndDoubleClick({
    onSingleClick, 
    onDoubleClick, 
    ignoreDoubleClick,
    delay = 250, 
}) {
        const [click, setClick] = useState(0);

        useEffect(() => {
            if (ignoreDoubleClick) {
            if (click === 1) onSingleClick();
            setClick(0);
            }
            else { 
            const timer = setTimeout(() => {
                if (click === 1) onSingleClick();
                setClick(0);
            }, delay);

            if (click === 2) onDoubleClick();

            return () => clearTimeout(timer);
            }
        }, [click]);

        return () => setClick(prev => prev + 1);
}

export default useSimpleAndDoubleClick;