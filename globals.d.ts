/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'electron-connect';
declare module 'electron-redux';
declare module 'axios-logger';
declare module 'material-icons-react';
declare module '@material-ui/*';
declare module 'valid-url';
declare module 'internet-available';
declare module 'animejs';
declare module 'electron-default-menu';
declare module 'react-avatar-editor';
declare module 'sudo-prompt';
declare module 'wget';
declare module 'desktop-screenshot';
declare module 'bookmark-parser';

declare module '*.png' {
    const value: any;
    export default value;
}

declare module '*.svg' {
    const value: any;
    export default value;
}

// eslint-disable-next-line @typescript-eslint/camelcase
declare const __non_webpack_require__: typeof require;
declare const Application: any;
