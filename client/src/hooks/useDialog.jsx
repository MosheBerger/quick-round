import { useState } from "react"
import Dialog from "../components/Dialog"

function useDialog(children) {
    const [open, setOpen] = useState(false)
    const handleOpenCLose = () => {setOpen(p => !p)}


    return [Dialog, open ,handleOpenCLose]
}
export default useDialog