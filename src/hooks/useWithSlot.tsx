import React from "react";
import Dialog, {
    DialogAction, DialogCloseAction, DialogFullscreenAction, DialogHeaderActionsWrapper, DialogProcessing,
} from "react-dialogger"
import {
    ActionDialogDef,
    ActionDef, IDialogDef, IFooterProps, IHeaderProps, IBaseFooterProps, IBaseHeaderProps
} from "react-dialogger/types"

const FooterSlot = (props: IFooterProps) => {

    console.log('FooterSlot_props', props);
    /*
    return <div>Footer</div>;*/

    // const {loading, values, options, dialogOptions} = props;
    const {values, dialogOptions} = props;
    return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', columnGap: 2}} >
        <span>Collected: Online XS {values.name}</span>
        <DialogProcessing />
    </div>;
}

const HeaderSlot = (props: IHeaderProps) => {

    console.log('HeaderSlot_props', props );

    return <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
        <div>
            {props.headerName}
            <span style={{fontSize: '12px', fontWeight: 'bold', color: "cyan", fontStyle: "italic"}}>{props.values.name}</span>
        </div>
        <DialogHeaderActionsWrapper>
            <DialogCloseAction />
            <DialogFullscreenAction />
        </DialogHeaderActionsWrapper>
    </div>;
}

const useWithSlot = () => {

    const openDialog = () => {
        const okAction = new DialogAction('okAction', {
            label: 'Ok',
            variant: 'contained',
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
                resizeable: true,
                draggable: true,
                style:{
                    borderRadius: 12,
                    boxShadow: "none",
                    fontFamily: 'Monospace'
                },
                size: {
                    width: 'lg',
                    height: 'initial'
                }
            },
            slot: {
                // action: ActionSlot,
                footer: FooterSlot,
                header: HeaderSlot
            },
            slotProps: {
                action: {
                    style: {
                        padding: '3px 20px', border: '1px solid red',
                        color: 'white',
                        borderRadius: 10,
                    },
                    className: 'custom-action-class'
                },
                footer: ( props: IBaseFooterProps ) => {

                    console.log('FooterSlot_props_X', props);

                    return {...props,
                        loading: props.inProcess,
                        values: props.dialogValues,
                        options: props.dialogOptions,

                        // style: {
                        //     padding: '3px 20px', border: '1px solid red',
                        //     color: 'white',
                        //     borderRadius: 10,
                        // },
                        className: 'custom-footer-class'
                    }
                },
                header: ( props: IBaseHeaderProps ) => {
                    return {
                        values: props.dialogValues,
                        options: props.dialogOptions,
                        className: 'custom-action-class-x',
                        headerName: 'Test Dialog'
                    }
                }
            }
        });
        dialog
            // Header Will be ignored
            .setHeader( (dialog: IDialogDef ) => <div>
                <span>Update Values</span>
                <span>{dialog.values.name} {dialog.values.surname}</span>
            </div> )
            .setBody( (dialog: IDialogDef) => <div>
                <table>
                      <thead>
                        <tr>
                            <th align={'left'}>Name</th>
                            <th align={'left'}>Surname</th>
                        </tr>
                      </thead>
                    <tbody>
                        <tr>
                            <td align={'left'}>{dialog.values.name}</td>
                            <td align={'left'}>{dialog.values.surname}</td>
                        </tr>
                    </tbody>
                </table>
            </div> )
            // Customized Footer has been added
            .addActions([
                cancelAction,
                okAction,
            ])
            .initialValues({
                name: 'Phillip',
                surname: 'Müller'
            })
            .show( (dialog: IDialogDef) => {

                dialog.setInProcess(true, 'Update only the name in 3 sec...');
                setTimeout(()=> {
                    dialog.setValue('name', 'New Phillip');

                    dialog.setInProcess(true, `Update only name to ${dialog.values.name}, now all values in 10 sec...`);
                    setTimeout(()=> {
                        dialog.setValues({
                            name: 'Updated name to Thomas',
                            surname: 'Updated to surname to Marcus'
                        });
                        // dialog.setInProcess(false);
                    }, 10000);

                }, 3000)


            });
    }


    return {
        openDialog
    }

}

export {useWithSlot}