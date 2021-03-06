import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setDrawer, setDarkTheme} from "../../actions/settings"
import {Header} from "./Header"

export const HeaderContainer = () => {
    const dispatch = useDispatch()
    const {darkTheme, isDrawerOpen} = useSelector((state) => state.settings)
    const profile = useSelector((state) => state.profile.profiles[0])

    useEffect(() => {
        document.documentElement.setAttribute("theme", darkTheme ? 'dark' : 'white')
    }, [])

    return <Header open={isDrawerOpen}
                   setOpen={() => dispatch(setDrawer())}
                   profile={profile}
                   darkTheme={darkTheme}
                   setDarkTheme={() => dispatch(setDarkTheme())}/>
}
