# NPM
```js
npm i react-dialogger
```

# GitHub
You can find the example code and more information about the project on our [GitHub repository](https://github.com/appinsource2021/react-dialogger-example.git).

# codesandbox
You can find the example code about the project on our [Codesandbox](https://codesandbox.io/p/sandbox/7r3t84).

# Youtube
You can watch simple example on Youtube [Youtube](https://www.youtube.com/watch?v=vhSroEgdj1c)


# react-dialogger - Custom Dialog Component Documentation

This documentation explains the configuration of the Custom Dialog Component and how to customize it using initial options with the `useDialogOptions` function. `useDialogOptions` allows you to set the initial options to manage the dialog's appearance and behavior.

# Global Dialog Configuration

#### baseDialogOptions

`baseDialogOptions` This property is created at the top-level of the app and serves as the default configuration used throughout the entire application. Later, when creating individual dialogs, these options can be overridden by specifying dialog-specific options.

```Global Dialog Configuration
The useDialogOptions function is placed at the beginning of the application to define base settings for all dialogs used throughout the app. These settings act as a global configuration, ensuring consistency across all dialog components.

By defining these options globally, you ensure that all dialogs share common behaviors and styling. This approach simplifies managing the appearance and functionality of dialogs, as you only need to modify the base configuration in one place.

Custom Dialog Configurations

Although a global configuration is set by useDialogOptions, each dialog can still be individually customized as needed. You can override the default settings for specific dialogs to meet particular requirements. This flexibility allows you to customize the appearance, behavior, and actions of each dialog instance separately, while still maintaining the benefits of a unified base configuration.
```
## Example Usage

Below is an example of customizing a dialog using `baseDialogOptions`:



```js
baseDialogOptions({
    backdrop: {
        backgroundColor: "#282828",
        opacity: 0.6,
        hideOnClick: false,
    },
    base: {
        style: {
            backgroundColor: "white",
            boxShadow: "0 0 20px #000000",
        },
        closeable: false,
        about: false,
        initialAnchor: { vertical: "flex-start", horizontal: "center" },
        draggable: false,
        size: { width: 'min-content', height: 300 },
        actions: {
            initialIntents: {
                positive: { color: 'primary', variant: 'contained' },
                negative: { color: 'error', variant: 'contained' },
                neutral: { color: 'default', variant: 'text' }
            }
        }
    },
    animate: 'none',
    progress: { color: "red", size: 30 },
    snackbar: {
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 3000,
        maxSnack: 3
    },
    slot: { action: undefined },
    slotProps: { action: {} },
    localText: { busyMessage: "Please wait..." }
});
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


# Basic Usage of Custom Dialog Component

This example demonstrates the basic usage of the **Custom Dialog Component** with predefined actions, content, and properties. The dialog can be configured to include actions (buttons), initial values, and custom behaviors for interaction.

## 1. Creating Actions with DialogAction

Actions are defined for the dialog buttons (e.g., "Ok" and "Close").

- **Ok Action**: The "Ok" button has a `text` variant and `default` color.
- **Close Action**: The "Close" button has a `contained` variant and `primary` color.

```javascript
// You can create a simple action using shortened syntax:
const okAction = new DialogAction('okAction').setIntent('positive');
/**
 * 'okAction' is used as the ID for this action. It is recommended to keep the variable name the same as the ID for easier access.
 * .setIntent('positive') refers to a global intent defined in baseDialogOptions.
 * Alternatively, you can provide custom options for this action, which will override the intent settings.
 */
const okAction = new DialogAction('okAction', {
    label: 'Ok',
    variant: 'text',
    color: 'default'
});
okAction.onClick((button, dialog1) => {
    // Actions when Ok button is clicked
});
// Eget intent kullanilirsa ve options icinde bir label etiketi verilmesse action "name" label etiket olarak baz alinir
// Eget bu etiketin tercumesi ile iligli islem yapilacaksa o hanfe baseOptions icinde ki local text bolumde bu action name key olarak verilir 
// tercumesi karsisina yazilir
```
#### Notes on Labels and Translation
* If an intent is used and no label is provided in the options, the action will use the action name as the label.
* If you need to translate this label, you can define it in the localText section of baseDialogOptions using the action name as the key. The translated text will then replace the default label.

## 2. Create Dialog
The Dialog component can be initialized with optional configuration, allowing you to customize its behavior and appearance, such as resizing and dragging capabilities.
```javascript
const dialog = new Dialog(null, {
    // These settings are customized and will override the default baseDialogOptions
    base: {
        memoBounds: true,   // Register rect of last position and size of dialog
        resizeable: true,   // Allows the dialog to be resized
        draggable: true     // Allows the dialog to be dragged
    }
});
```
## 3. Set Header and Body
The dialog’s header and body content can be defined dynamically. Both are set using functions, which allows you to render content based on the current state or data available in the dialog.
```javascript
dialog
    .setHeader((dialog) => <div>Dialog Header - {dialog.formikProps.values.name}</div>)
    .setBody((dialog) => (
        <>
            <ProjectOrderDialogBody dialog={dialog} />
            <p>Additional content here...</p>
        </>
    ));
```
* Header: The setHeader function returns a React element to display in the dialog’s header area.
* Body: The setBody function returns a React element for the main content of the dialog.
* Both functions receive the dialog instance as an argument, giving access to values, features, and actions for dynamic rendering.
#### This approach makes it easy to inject custom components or dynamic content into dialogs at runtime.


## 4. Add Actions
The dialog supports custom actions, such as "Ok" and "Close" buttons. Actions are created using the DialogAction class and then added to the dialog via the addActions method.

```javascript
    .addActions([
    okAction,    // Add Ok button action
    closeAction  // Add Close button action
])
```
* Creating Actions: Each action has an ID (used internally and recommended to match the variable name) and can have an intent or custom options like label, color, and variant.
* onClick: Defines the behavior when the action is clicked.
* addActions: Adds one or more actions to the dialog.
#### This allows you to define interactive buttons for your dialog, with full flexibility over appearance and behavior.


## 5. Set Initial Values
You can initialize values for the dialog, such as form fields or other settings. These values will be used throughout the dialog lifecycle.

```javascript
    .initialValues({
    my_name: 'Eric',  // Set initial value for name
    age: 29           // Set initial value for age
})
``` 
* initialValues: Sets the starting data for the dialog.
* These values can be read or updated dynamically by the dialog body, header, or actions.
* Useful for prefilling forms, maintaining state, or passing initial configuration to dialog features.

## Updating Dialog Values

#### You can update the dialog's values at any point during its lifecycle using the setValues method. This is useful for dynamically changing data within the dialog based on user actions or other events.
```
dialog.setValues({
    ...dialog.values,   // Preserve existing values
    sex: "Woman/Man"    // Update or add new value
});

```
* setValues: Merges the new values with the existing ones.
* dialog.values: Provides access to the current state of the dialog’s data.
* Allows components, actions, or features within the dialog to dynamically update the state.
#### This ensures that your dialog content and behavior can reactively adapt to user interactions or other runtime changes.

## Updating a Single Value
#### You can also update a single value in the dialog using the setValue method:
```
dialog.setValue('sex', 'Man/Woman');
```
* setValue(key, value): Updates a specific property in the dialog’s values.
* Equivalent to updating via setValues, but convenient for single-field updates.
* Useful for reactively changing individual fields without affecting other values.
#### This method provides a concise and flexible way to modify the dialog’s state at runtime.


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
- **Dialog Initialization**: Create a dialog instance with optional configuration for resizing and dragging.
- **Actions**: Define action buttons (e.g., Ok, Cancel) with custom behavior via click handlers.
- **Content**: Dynamically set the dialog header and body content.
- **⚠ Header Slot Consideration**: The `setHeader` method will be ignored if a **header slot** is provided.
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

