import React from "react";
import Dialog, {
    DialogAction,
} from "react-dialogger"
import {
    ActionDialogDef,
    ActionDef, IDialogDef
} from "react-dialogger/types"

const useBasic = () => {

    const openDialog = () => {
        const okAction = new DialogAction('okAction', {
            label: 'Ok',
            variant: 'contained',
            // color: 'green'
            style: {
                backgroundColor: 'green', color: 'white', padding: '3px 20px'
            }
        });
        okAction.onClick((button: ActionDef, dialog: ActionDialogDef ) => {
            button.setInProcess(true);
        })
        const cancelAction = new DialogAction('cancelAction', {
            label: 'Cancel',
            variant: 'text',
            color: 'primary'
        });
        cancelAction.onClick( (button: ActionDef, dialog: ActionDialogDef) => {
            dialog.close();
        });

        const dialog = new Dialog( null, {
            base: {
                size: {
                    width: "sm",
                    height: "initial"
                },
                resizeable: true,
                draggable: true,
                style:{
                    borderRadius: 12,
                    boxShadow: "none"
                },
                initialAnchor: {
                    vertical: 'flex-end',
                    horizontal: 'center'
                }
            }
        });
        dialog
            .setHeader( (dialog: IDialogDef ) => 'Basic Example')
            .setBody( (dialog: IDialogDef) => <div>Content</div> )
            .addActions([
                cancelAction,
                okAction,
            ])
            .initialState({
            })
            .show( (dialog: IDialogDef) => {

            });
    }


    return {
        openDialog
    }

}

export {useBasic}