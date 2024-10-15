import { AuthStateType } from 'store/slices/authState';

// eslint does not understand bracket notation
// eslint-disable-next-line css-modules/no-unused-class
import style from './EditorAuthstateClassname.module.scss';

export const editorAuthstateClassname = (authState: AuthStateType) => style[authState];
