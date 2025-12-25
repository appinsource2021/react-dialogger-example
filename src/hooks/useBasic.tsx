import React from "react";
import Dialog, {
    DialogAction,

} from "react-dialogger"
import {IDialogApiDef, ActionApiDef} from "react-dialogger/types"
import {DialogBody} from "./DialogBody.tsx";

const useBasic = () => {

    const openDialog = () => {
        const positiveAction = new DialogAction("positiveAction").setIntent(
            "positive"
        );
        positiveAction.onClick((button: ActionApiDef, dialog: IDialogApiDef) => {
            button.setInProcess(true);
        });
        const negativeAction = new DialogAction("negativeAction").setIntent(
            "negative"
        );
        negativeAction.onClick((button: ActionApiDef, dialog: IDialogApiDef) => {
            button.setInProcess(true);
        });
        const custom = new DialogAction("custom", {
            label: "Negative",
            variant: "outlined",
            color: "blue",
        });
        custom.onClick((button: ActionApiDef, dialog: IDialogApiDef) => {
            dialog.close();
        });

        const dialog = new Dialog(null, {
            base: {
                memoBounds: true,
                // Id required by memoBounds
                id: "specicif-dialog-id",
                size: {
                    width: "sm",
                    height: 500,
                },
                resizeable: true,
                draggable: true,
                style: {
                    borderRadius: 12,
                    boxShadow: "none",
                },
                initialAnchor: {
                    vertical: "flex-start",
                    horizontal: "center",
                },
            },
            animate: "jumper",
        });
        dialog
            .setHeader((dialog: IDialogApiDef) => "Basic Example")
            .setBody((dialog: IDialogApiDef) => <DialogBody dialog={dialog} />)
            .addActions([custom, negativeAction, positiveAction])
            .initialValues({
                name: "My Name ",
            })
            .show((dialog: IDialogApiDef) => {});
    };

    return {
        openDialog
    }

}

export {useBasic}