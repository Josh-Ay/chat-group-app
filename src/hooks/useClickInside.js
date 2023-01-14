import { useEffect } from "react";

export default function useClickInside (elemRef, handleClickInside) {

    useEffect( () => {

        const closeCurrentItem = (e) => {
            if (!elemRef.current) return;

            if( (e.key === "Escape")  || (elemRef.current && elemRef.current.contains(e.target)) ) handleClickInside();
        }

        document.addEventListener("click", closeCurrentItem, true);

        return () => {
            document.removeEventListener("click", closeCurrentItem, true);
        }

    }, [elemRef, handleClickInside]);
}