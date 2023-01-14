import { useEffect } from "react";

export default function useScrollToBottom(refToDiv) {
    useEffect(() => {
        // if there is no reference to the element, do nothing
        if (!refToDiv.current) return;
        
        // scrolling to the bottom(the element's height)
        refToDiv.current.scrollTop = refToDiv.current.scrollHeight;

    }, [refToDiv])
}