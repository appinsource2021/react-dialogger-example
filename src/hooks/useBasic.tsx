import React from "react";
import Dialog, {
    DialogAction,

} from "react-dialogger"
import {IDialogApiDef} from "react-dialogger/types"
import {DialogBody} from "./DialogBody.tsx";

const useBasic = () => {

    const openDialog = (apiRef: React.RefObject<IDialogApiDef>) => {




        const save = new DialogAction('save')
        save.setIntent('positive').onClick((button, dialog ) => {
            // OnClick Event
            alert(3);
        })
        const cancel = new DialogAction('cancel');
        cancel
            .stateListener((values, button, dialog) => {
                button.setInProcess(true);
                // ...
            })
            .setIntent('neutral').onClick( (button, dialog) => {
            dialog.close();
        });

        const dialog = new Dialog( apiRef, {
            base: {
                memoBounds: true,
                id: 'my-dialog-1',
                size: {
                    width: 800, height: 500
                },
                fullscreen: true,
                resizeable: true,
                draggable: true,
                closeable: true,
                style:{
                    borderRadius: 12,
                    boxShadow: "none"
                },
                initialAnchor: {
                    vertical: 'center',
                    horizontal: 'flex-end'
                },
                actions: {
                    disabledOnDialogProcessing: true
                }
            },
            animate: 'jumper',
            backdrop: {
                hideOnClick: true
            },
            localText: {
                // Successfully if action label not used
                save: 'Speichern',
                cancel: 'Abbrechen',
                busyMessage: 'Cok Mesgul!!!'
            }

        });
        dialog
            .setHeader( (dialog: IDialogApiDef ) => {
                return <div>My Header...{dialog.getFeature('formik')?.values.name}</div>
            })
            .setBody( (dialog: IDialogApiDef) => {
                console.log('DialogBody_body', dialog?.values);
                // @ts-ignore
                return <React.Fragment><DialogBody dialog={dialog} />GH</React.Fragment>
            })
            .addActions([
                cancel,
                save,
            ])
            .initialValues({
                name: 'Add your name'
            })
            .show( (dialog: IDialogApiDef) => {
            });

    }


    return {
        openDialog
    }

}

export {useBasic}