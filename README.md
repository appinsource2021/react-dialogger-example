# NPM
```js
npm i react-dialogger
```

# GitHub
You can find the example code and more information about the project on our [GitHub repository](https://github.com/appinsource2021/react-dialogger-example.git).

# codesandbox
You can find the example code about the project on our [Codesandbox](https://codesandbox.io/p/sandbox/7r3t84).


# react-araci - Custom Dialog Component Documentation

This documentation explains the configuration of the Custom Dialog Component and how to customize it using initial options with the `useDialogOptions` function. `useDialogOptions` allows you to set the initial options to manage the dialog's appearance and behavior.

## useDialogOptions Hook

`useDialogOptions` is a hook used to set the initial options of a Dialog component. This hook allows you to configure various properties of the dialog, such as the header, footer, size, style, etc.

```Global Dialog Configuration
The useDialogOptions function is placed at the beginning of the application to define base settings for all dialogs used throughout the app. These settings act as a global configuration, ensuring consistency across all dialog components.

By defining these options globally, you ensure that all dialogs share common behaviors and styling. This approach simplifies managing the appearance and functionality of dialogs, as you only need to modify the base configuration in one place.

Custom Dialog Configurations

Although a global configuration is set by useDialogOptions, each dialog can still be individually customized as needed. You can override the default settings for specific dialogs to meet particular requirements. This flexibility allows you to customize the appearance, behavior, and actions of each dialog instance separately, while still maintaining the benefits of a unified base configuration.
```
## Example Usage

Below is an example of customizing a dialog using `useDialogOptions`:

#### useDialogOptions (Base)
```js
useDialogOptions({
    base: {
        footer: {
            style: { // Footer custom styles
                backgroundColor: '#f1f1f1' // Background color for footer
            }
        },
        header: {
            style: { // Header custom styles
                backgroundColor: '#333', // Background color for header
                color: '#fff' // Text color for header
            }
        },
        fullscreen: true, // Enables fullscreen mode for the dialog
        notifyOnClosing: 'zoom', // Notification method on closing ('zoom' or 'snackbar')
        headerControllerIcons: {
            size: 20, // Icon size in header
            color: 'red' // Icon color in header
        },
        style: { // General styles for the dialog
            borderRadius: '8px', // Round corners for the dialog
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)' // Shadow around the dialog
        },
        resizeable: true, // Makes the dialog resizable by the user
        draggable: true, // Allows the dialog to be dragged around the screen
        closeable: true, // Allows the dialog to be closed
        initialAnchor: {
            vertical: 'center', // Vertical position of the dialog ('flex-start', 'center', 'flex-end')
            horizontal: 'center' // Horizontal position of the dialog ('flex-start', 'center', 'flex-end')
        },
        size: {
            width: 800, // Dialog width in pixels
            height: 600 // Dialog height in pixels
        },
        actions: {
            disabledOnDialogProcessing: true, // Disables actions when the dialog is processing
            baseStyle: { // Custom styles for action buttons
                padding: '5px 20px', // Padding inside action buttons
                border: '2px solid #ccc', // Border for action buttons
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)' // Shadow for action buttons
            }
        }
    }
});
```
#### useDialogOptions (snackbar)
```js
snackbar: {
    busyMessage: 'On Process, please wait!', // Message displayed during the process
    maxSnack: 4, // Maximum number of snackbars that can be displayed at once
    autoHideDuration: 5000, // Time in milliseconds before the snackbar automatically disappears (5000ms = 5 seconds)
    anchorOrigin: {
        horizontal: "center", // Horizontal alignment of the snackbar (center, left, right)
        vertical: "top" // Vertical alignment of the snackbar (top, bottom)
    }
}
```

#### useDialogOptions (Slot & Slot Props)
```js
slot: {
    header: HeaderSlot, // Slot for the header, can be a custom component or template
        footer: FooterSlot // Slot for the footer, can be a custom component or template
},
slotProps: {
    header: (props: IBaseHeaderProps) => {
        return {
            headerName: 'sampleProp' // Custom properties to be passed to the header slot component
        }
    },
        footer: (props: IBaseFooterProps) => {
        return {
            footerName: 'Footer' // Custom properties to be passed to the footer slot component
        }
    }
}

// Header Slot Component
const HeaderSlot = (props: IHeaderProps) => {
    const { headerName } = props;
    return <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
        <div>
            {headerName}
            {/**values.name is dynamic by updated state than will trigger re-render*/}
            <span style={{fontSize: '12px', fontWeight: 'bold', color: "cyan", fontStyle: "italic"}}>{props.values.name}</span>
        </div>
        {/**Use futures*/}
        <DialogHeaderActionsWrapper>
            <DialogFullscreenAction />
            <DialogCloseAction />
        </DialogHeaderActionsWrapper>
    </div>;
}

// Footer Slot Component
const FooterSlot = (props: IFooterProps) => {
    
    const {footerName, inProcess} = props;
    return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', columnGap: 2}} >
        <span>Collected: Online {props.footerName}</span>
        <DialogProcessing />
    </div>;
}

// Explanation
// Footer & Header slot props are merged with the custom props inside slotProps.
// These custom props are then passed to the respective slot components, allowing dynamic and flexible content injection.
// The base dialog props (e.g., dialogValues, dialogOptions) are still accessible, and users can merge their own custom props as needed.

export interface BaseDialogSlotProps {
    dialogValues: TValues; // The values that the dialog holds
    dialogOptions: DialogOptionsType; // The options controlling the dialog's behavior
    dialog?: IDialogRef; // A reference to the dialog component for external control
}


```

#### useDialogOptions (Progress)
```js
progress: {
    size: 20,
    color: 'red'
},
```
#### useDialogOptions (Backdrop)
```js
backdrop: {
    backgroundColor: '#282828', // The background color of the backdrop (overlay) behind the dialog
    opacity: 0.6, // The opacity of the backdrop (0 = fully transparent, 1 = fully opaque)
    hideOnClick: false // Determines whether the backdrop will hide when clicked
}


```


# Basic Usage of Custom Dialog Component

This example demonstrates the basic usage of the **Custom Dialog Component** with predefined actions, content, and properties. The dialog can be configured to include actions (buttons), initial values, and custom behaviors for interaction.

## 1. Create Actions

Actions are defined for the dialog buttons (e.g., "Ok" and "Close").

- **Ok Action**: The "Ok" button has a `text` variant and `default` color.
- **Close Action**: The "Close" button has a `contained` variant and `primary` color.

```javascript
const okAction = new DialogAction('okAction', {
    label: 'Ok',
    variant: 'text',
    color: 'default'
});
okAction.onClick((button, dialog1) => {
    // Actions when Ok button is clicked
});

const closeAction = new DialogAction('closeAction', {
    label: 'Close',
    variant: 'contained',
    color: 'primary'
});
closeAction.onClick((button, dialog1) => {
    dialog1.close();  // Closes the dialog when the Close button is clicked
});
```

## 2. Create Dialog
The Dialog component is initialized with optional configuration such as resize and drag capabilities.

```javascript
const dialog = new Dialog(null, {
    base: {
        resizeable: true,  // Dialog can be resized
        draggable: true    // Dialog can be dragged
    }
});
```
## 3. Set Header and Body
You can define the dialog’s header and body content dynamically. The content is set through functions, allowing flexibility in displaying data.

```javascript
dialog
    .setHeader(dialog1 => 'Dialog header')  // Set dialog header
    .setBody(dialog1 => 'Dialog Body')      // Set dialog body content
```

## 4. Add Actions
The dialog supports custom actions like the "Ok" and "Close" buttons. These actions are added to the dialog with the addActions method.

```javascript
    .addActions([
        okAction,    // Add Ok button action
        closeAction  // Add Close button action
    ])
```
## 5. Set Initial Values
You can initialize values for the dialog, such as form fields or other settings. These values will be used throughout the dialog lifecycle.

```javascript
    .initialValues({
        my_name: 'Eric',  // Set initial value for name
        age: 29           // Set initial value for age
    })
``` 
## 6. Show the Dialog
Finally, the dialog is displayed using the show method. You can define additional logic that runs when the dialog is shown.

```javascript
    .show(dialog1 => {
        // Actions when the dialog is shown
    });
```

## Using Formik Inside Dialog Body

If **Formik** is used inside the dialog body, its `formikProps` can be linked to the dialog’s internal `formikProps`. This allows access to form properties from anywhere within the dialog.

### Example: Binding Formik to Dialog

```javascript
dialog.setBody(dialog1 => (
    <MyComponent>
        <Formik 
            initialValues={{
                my_name: dialog1.values.my_name,
                age: dialog1.values.age
            }} 
            onSubmit={(values, formikHelpers) => {
                // Form submission logic
                // This event is triggered via okAction click 🚀
            }}
        >
            {formikProps => {
                dialog1.formikProps = formikProps; // Bind Formik props to dialog

                return (
                    <form>
                        {/* Form content goes here */}
                    </form>
                );
            }}
        </Formik>
    </MyComponent>
));

// Example: Triggering Form Submission from an Action

const okAction = new DialogAction('okAction', {
    label: 'Ok',
    variant: 'text',
    color: 'default'
});

okAction.onClick((button, dialog1) => {
    dialog1.formikProps.submitForm(); // 🚀 Trigger form submission via action button
});
```

## User Footer Slot 



## Summary of Basic Usage
```php
- **Dialog Initialization**: Create a dialog instance with optional configuration for resize and drag behavior.
- **Actions**: Define action buttons (Ok, Close) with custom behavior (click handling).
- **Content**: Dynamically set the dialog header and body content.
- **⚠ Header Slot Consideration**: `setHeader` will be ignored if a **header slot** is used.
- **Initial Values**: Set initial values for the dialog’s content (e.g., form fields).
- **Show Dialog**: Display the dialog and handle any post-display logic.

This basic usage setup enables you to quickly configure and display a custom dialog with dynamic content and actions, making it highly customizable for various use cases in your application.
```

> **⚠ Important Notice**  
> This package is a continuation of the `react-araci` package.  
> Due to an error, `react-araci` was removed, and it has been decided to continue under the new package name **`react-dialogger`**.

## 📩 Contact
For support or inquiries, please reach out via email:  
✉️ [developer@appinsource.eu](mailto:developer@appinsource.eu)

