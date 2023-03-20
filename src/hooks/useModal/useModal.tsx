import { useState } from "react";

export default function useAlertBox() {
    const [alert, setAlert] = useState(false);
    const [modal, setModal] = useState(
        {
            status: false,
            title: '',
            text: '',
        }
    );

    function hiddenBoxAlert() {
        setAlert(false);
    }

    return { alert, setAlert, modal, setModal, hiddenBoxAlert }
}