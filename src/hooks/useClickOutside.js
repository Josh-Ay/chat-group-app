import { useEffect } from "react";

export default function useClickOutside (elemRef, handleClickOutside) {

    useEffect( () => {

        const closeCurrentItem = (e) => {
            if (!elemRef.current) return;

            if( (e.key === "Escape")  || (elemRef.current && !elemRef.current.contains(e.target)) ) handleClickOutside();
        }

        document.addEventListener("click", closeCurrentItem, true);

        return () => {
            document.removeEventListener("click", closeCurrentItem, true);
        }

    }, [elemRef, handleClickOutside]);
}