import {changeThemeModeAC, selectAppStatus, selectThemeMode} from "@/app/app-slice.ts"
import {useAppDispatch, useAppSelector} from "@/common/hooks"
import {containerSx} from "@/common/styles"
import {getTheme} from "@/common/theme"
import {NavButton} from "@/common/components/NavButton/NavButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import LinearProgress from "@mui/material/LinearProgress"
import {ButtonLink} from "@/common/components/ButtonLink/ButtonLink";
import {logoutTC, selectIsLoggedIn} from "@/features/auth/model/auth-slice";
import {clearDataAC} from "@/common/actions";

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const status = useAppSelector(selectAppStatus)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    const theme = getTheme(themeMode)

    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === "light" ? "dark" : "light"}))
    }

    const signOutHandler = () => {
        dispatch(logoutTC())
        dispatch(clearDataAC())
    }

    return (
        <AppBar position="static" sx={{mb: "30px"}}>
            <Toolbar>
                <Container maxWidth={"lg"} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>

                        <ButtonLink
                            href={"/login"}
                            buttonProps={{
                                variant: "contained",
                                color: 'inherit',
                            }}
                        >
                            Login
                        </ButtonLink>
                        <ButtonLink
                            href={"*"}
                            buttonProps={{
                                variant: "contained",
                                color: 'inherit',
                            }}
                        >
                            404
                        </ButtonLink>
                        {/*//*/}
                        {isLoggedIn && <NavButton onClick={signOutHandler}>Logout</NavButton>}
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={"default"} onChange={changeMode}/>
                    </div>
                </Container>
            </Toolbar>
            {status === "loading" && <LinearProgress/>}
        </AppBar>
    )
}
