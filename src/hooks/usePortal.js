import React,{useState,useEffect} from 'react'
import { createPortal } from 'react-dom'

function usePortal({target}={}){
    const [node,setNode]=useState();
    useEffect(() => {
        let box=target || window.document.body
        let node = window.document.createElement('div')
        box.appendChild(node)
        setNode(node)
        return () => {
            setNode()
            box.removeChild(node)
        }
    }, [])
   
    function Portal({children,...props}){
        if(!node){
            return <></>
        }
        return createPortal(React.cloneElement(children,props),node);
    }
    return {Portal}
}

export default usePortal