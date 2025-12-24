import React, {JSX} from "react";
import {IDialogApiDef} from "react-dialogger";
import "./styles.scss";

const DialogBody: React.FC<{dialog: IDialogApiDef}> = ({dialog}) => {
    return <div className={'example'}>
        <b>Welcome</b>
        <span>{dialog.values.name}</span>
        <button onClick={(event)=>{
            dialog.close()
        }}>{'Close me'}</button>
    </div>
}
export {DialogBody};