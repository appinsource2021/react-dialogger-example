import React, {JSX} from "react";
import {IDialogApiDef} from "react-dialogger";

const DialogBody: React.FC<{dialog: IDialogApiDef}> = ({dialog}) => {
    return <div>Ola SC {dialog?.values?.name} </div>
}
export {DialogBody};