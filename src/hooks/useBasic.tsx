import React, {JSX} from "react";
import {FC} from 'react';
import Dialog, {
    DialogAction,

} from "react-dialogger"
import {IDialogApiDef} from "react-dialogger/types"
import {useFormik} from "formik";
import {ProjectOrderDialogBody} from "./DialogBody.tsx";
import dialog from "react-dialogger";




const useBasic = () => {



    const openDialog = () => {

        const apiRef  = React.useRef<IDialogApiDef|null>(null);


        const kaydet = new DialogAction('keydet')
        kaydet.setIntent('positive').onClick((button, dialog ) => {
            // OnClick Event
            alert(3);
        })
        const cancelAction = new DialogAction('cancelAction');
        cancelAction
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
                id: 'suleyman-dialog-1',
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
                keydet: 'Tamam',
                cancel: 'Iptal',
                busyMessage: 'Cok Mesgul!!!'
            }

        });
        dialog
            .setHeader( (dialog: IDialogApiDef ) => {
                return <div>My Header...{dialog.getFeature('formik')?.values.name}</div>
            })
            .setBody( (dialog: IDialogApiDef) => {
                console.log('ProjectOrderDialogBody_X', dialog?.values);
                // @ts-ignore
                return <React.Fragment><ProjectOrderDialogBody dialog={dialog} />GH</React.Fragment>
            })
            .addActions([
                cancelAction,
                kaydet,
            ])
            .initialValues({
                name: 'Patric'
            })
            .show( (dialog: IDialogApiDef) => {
            });

    }


    return {
        openDialog
    }

}

export {useBasic}