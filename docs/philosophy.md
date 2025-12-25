## Philosophy
## Why react-dialogger Exists

Modern React applications often require dialogs that are **dynamic, stateful, and context-aware**.  
However, most dialog solutions are built around **static JSX components** that are tightly coupled to the component tree and local state.

**react-dialogger** was created to overcome these limitations.

Instead of treating dialogs as static UI components, react-dialogger treats them as **runtime-managed UI flows**.

> Dialogs are not rendered — they are **invoked**.

### The Core Idea
react-dialogger is built on three fundamental principles:

### 1. Runtime-First Dialog Creation
     Dialogs are created when needed, not pre-declared in JSX.
```ts
new Dialog().setHeader(...).setBody(...).addActions(...).show();
```
This allows dialogs to be triggered from:
 * async operations
 * validation flows
 * business logic
 * service layers

without coupling them to React render cycles.

### 2. Centralized Configuration, Local Overrides
With baseDialogOptions, applications define a global dialog behavior and style once.
* Consistent UI and UX
* Shared intents, localization, and defaults
* Predictable behavior across the app

At the same time, each dialog can override these options when necessary, keeping flexibility without sacrificing consistency.

### 3. Action-Driven Architecture
In react-dialogger, actions are first-class citizens.
Dialogs don’t own logic — actions do.
```ts
new DialogAction('confirm')
  .setIntent('positive')
  .onClick((button, dialog) => {
    dialog.setValue('confirmed', true);
  });
```
#### <b>This makes dialog flows:</b>
* explicit
* testable
* reusable
* easy to reason about

### Dialog State Belongs to the Dialog
Instead of pushing dialog state into React components, react-dialogger allows dialogs to own their own state.
```ts
dialog.initialValues({ step: 1 });
dialog.setValue('step', 2);
```

This keeps React components:
* cleaner
* simpler
* focused on rendering, not orchestration

## When to Use react-dialogger
### ✅ Best suited for:
* Large or enterprise React applications
* Dynamic forms and wizards
* Async or flow-based UI logic
* Centralized dialog management
* Complex dialog interactions

### ❌ Not ideal for:
* Single static modal dialogs
* Very simple UI-only popups
* Cases where JSX-only dialogs are sufficient

## In One Sentence

> react-dialogger is a runtime dialog orchestration system for React, designed to manage complex dialog flows with centralized configuration and action-driven logic.

