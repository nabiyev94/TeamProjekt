import { ThemeProvider, createTheme } from '@rneui/themed';
import {masterColors} from './MasterColors'
import {masterStyle} from './MasterStyle'


export const theme = createTheme({
    lightColors: {
        primary: masterColors.primaryLight,
        secondary: masterColors.secondaryLight,
        background: masterColors.backgroundLight
    },
    darkColors: {
        primary: masterColors.primaryDark,
        secondary: masterColors.secondaryDark,
        background: masterColors.backgroundDark
    }
});
