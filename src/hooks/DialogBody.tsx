import React, {JSX} from "react";
import {useFormik} from "formik";
import {IDialogApiDef} from "react-dialogger";

const ProjectOrderDialogBody: React.FC<{dialog: IDialogApiDef}> = ({dialog}) => {
    return <div>Ola SC {dialog?.values?.name} </div>
}

export {ProjectOrderDialogBody};

// const initialValues = {
//     // ...dialog.formikProps.values,
//     ...dialog.values.order
// }
//
// const formikProps = useFormik({
//     // enableReinitialize: true,
//     initialValues: {
//         name: 'Suleyman'
//     },
//     onSubmit: (values, formikHelpers) => {
//
//     },
// });

// console.log('Dialog_values', dialog.values);


// dialog.formikProps = formikProps

// dialog.formikProps = useFormik({
//     initialValues: {name: 'Suleyman'},
//     onSubmit:(values, formikHelpers) => {
//
//     }
// });