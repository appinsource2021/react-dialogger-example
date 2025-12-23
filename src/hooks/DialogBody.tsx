import React, {JSX} from "react";
import {IDialogApiDef} from "react-dialogger";
import "./styles.scss";

const DialogBody: React.FC<{dialog: IDialogApiDef}> = ({dialog}) => {
    return <div className={'example'}>
        <b>Welcome</b>
        <span>{dialog.values.name}</span>
    </div>
}
export {DialogBody};