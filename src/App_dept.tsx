// @ts-ignore
// import logo from './logo.svg';
import './App.css';
import React, {useEffect, useRef, useState} from "react";
// import {Formik} from "formik";
import Dialog, {
    DialogAction,
    useDialogOptions,
    ActionProgress,
    DialogProcessing,
    IFooterProps,
    IHeaderProps,
    IBaseFooterProps,
    IBaseHeaderProps,
    DialogCloseAction,
    DialogFullscreenAction, DialogHeaderActionsWrapper
} from "react-dialogger";
import './styles.css';
import {Formik} from "formik";
import {examples} from "./examplesHook/examples";


// @ts-ignore

const ActionSlot = (props) => {
    return <button {...props} style={{...props.style}} >
        {
            true ? <ActionProgress /> : props.label
        }


    </button>
}

const FooterSlot = (props: IFooterProps) => {

    console.log('FooterSlot_props', props);
    /*
    return <div>Footer</div>;*/

    const {loading, values, options, dialogOptions} = props;
    return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', columnGap: 2}} >
        <span>Collected: Online {values.name}</span>
        <DialogProcessing size={10} inProcess={props.inProcess} progressColor={dialogOptions.progress?.color} />
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
            <DialogFullscreenAction dialog={props.dialog} />
            <DialogCloseAction dialog={props.dialog} />
        </DialogHeaderActionsWrapper>
    </div>;
}

function App() {

    const [loaded, setLoaded] = useState<boolean>(false);

    const myDialogRef: React.RefObject<Dialog> = useRef<Dialog>(null);
    useDialogOptions({
        base: {
            // draggable: false,
            // closeable: true,
            initialAnchor: {
                vertical: "flex-start",
                horizontal: "center"
            },
            size:{
                width: 1000,
                height: 500
            },
            actions: {
                disabledOnDialogProcessing: true,
                baseStyle: {
                    padding: '3px 20px', border: '2px solid', boxShadow: '0 0 10px #CCCCCC',
                }
            },
        },
        snackbar: {
            busyMessage: 'Beklemede',
            maxSnack: 4
        }
    });



    useEffect(()=>{

        console.log('myDialogRef', myDialogRef);
        if(myDialogRef.current){

            const {
                setInProcess,
                actions,
                // close,
                state,
                values,
                snackbar
            } = myDialogRef.current;

            // actions.okAction.setInProcess(true);
            setInProcess(true, 'Loading: ' + values.name )
            snackbar.open('Selam', 'success');
            setTimeout(() => {

                // const {setInProcess} = myDialogRef.current;

                // console.log('Is In process', actions.okAction.isInProcess());

                // actions.okAction.setDisabled(false)
                // actions.okAction.setInProcess(true).setVariant('contained');

                // actions.okAction.setVariant('contained');
                // Dialog setInProcess
                setInProcess(false);

                // actions.okAction.setInProcess(true);
                setTimeout(() => {
                    // actions.okAction.setOptions({
                    //     // disabled: false,
                    //     color: 'secondary',
                    //     variant: 'outlined',
                    //     label: 'Suleyman'
                    // })
                    //     .setInProcess(false)
                    //     .onClick((button, dialog) => {
                    //
                    //         button.setInProcess(true);
                    //         setTimeout(() => {
                    //             dialog.close();
                    //         }, 3000)
                    //     })

                    console.log('OK Action is in process', actions.okAction.isInProcess() )
                }, 1000)



                // setInProcess(false);
                // actions.okAction.setVariant('outlined').setDisabled(false).setInProcess(true);
                // actions.cancelAction.setInProcess(false).setDisabled(false);
                // myDialogRef.current.setInProcess(false);
                setTimeout(() => {
                    // close();
                }, 2000 );

            }, 3000)
        }

    }, [myDialogRef.current, loaded])

    const handleOpenDialog = () => {

        const txAction = new DialogAction('txAction', {
            label: 'Cancel',
            variant: 'outlined',
            color: 'warning',
            style: {
                backgroundColor: 'red',
                color: '#CCCCCC',
            }
        });
        txAction
            .stateListener((state, values) => {
                console.log('okActionStateListener', state, values);
            })
            .onClick( (button, dialog1) => {
                dialog1.setInProcess(true, 'Loading please wait...');
            });

        const okAction = new DialogAction('okAction', {
                    label: 'Ok',
                    variant: 'contained',
                    color: 'primary',
                    style: {
                        backgroundColor: 'green',
                        color: 'white'
                    },
                });
                okAction
                    .stateListener((state, values) => {
                        console.log('okActionStateListener', state, values);
                    })
                    .onClick( (button, dialog1) => {
                        dialog1.close();
                        button.setInProcess(true);
                    });
                const cancelAction = new DialogAction('cancelAction', {
                    label: 'Cancel',
                    variant: 'contained',
                    color: 'warning',
                    style: {
                        backgroundColor: 'purple',
                        color: 'white',
                    }
                });
                cancelAction
                    .stateListener((state, values) => {
                        console.log('cancelActionStateListener', state, values);
                    })
                    .onClick( (button, dialog1) => {
                        dialog1.setValue('name', 'Osman');
                        dialog1.snackbar.open('Osman Value Changed', 'info', '' ,  (key, snackbarRef) => {
                            return <button
                                onClick={event => {
                                    snackbarRef.closeSnackbar(key);
                                }}
                            >Close Me</button>
                        }, null );

                    });

                const dialog = new Dialog( myDialogRef, {
                    base: {
                        resizeable: true,
                        draggable: true,
                        actions: {
                            disabledOnDialogProcessing: true
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

                            return {
                                loading: props.inProcess,
                                values: props.dialogValues,
                                options: props.dialogOptions,

                                // style: {
                                //     padding: '3px 20px', border: '1px solid red',
                                //     color: 'white',
                                //     borderRadius: 10,
                                // },
                                className: 'custom-action-class'
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

                    // Ignored If Slot using
                    .setHeader( dialog1 => 'Sample dialog 1' + dialog1.values.name )

                    .setBody( dialog1 => <div>Dialog Content</div> )
                    .addActions([
                        cancelAction,
                        txAction,
                        okAction,
                    ])
                    .initialValues({
                        name: 'Suleyman'
                    })
                    .stateListener((state, values) => {
                        console.log('dialogStateListener', state, values);
                    })
                    .keyboardListener((key, dialogRef) => {
                        if(key === 'Enter'){
                            console.log('dialogKeyboardListener', key, dialogRef);
                            dialogRef.current.actions.okAction.setInProcess(true);
                        }
                    })
                    .onClose(() => {
                        setLoaded(false);
                    })
                    .show( dialog1 => {
                        setLoaded(true);
                        // Use Here Like useEffect !!!
                    });
    }

    const examples = examples();


    return (
        <div className="App">
            <button onClick={event => {

                examples.basic.openDialog();

            }}>Basic Example</button>

        </div>
    );
}

export default App;
