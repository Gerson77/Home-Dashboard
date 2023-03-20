import { useState } from "react";

export default function useAlertBox() {
    const [alert, setAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState(
        {
            status: false,
            title: '',
            text: '',
        }
    );

    function hiddenBoxAlert() {
        setAlert(false);
    }

    return { alert, setAlert, alertInfo, setAlertInfo, hiddenBoxAlert }
}