import {setOnFire} from '../actions/chats'
import {createMatchSelector} from "connected-react-router"
import { Middleware } from 'redux'

export const notificationMiddleware: Middleware = store => next => action => {

    if (action.type === 'SEND_MESSAGE') {
        const matchSelector = createMatchSelector("/chats/:chatId")
        const match = matchSelector(store.getState())
        // @ts-ignore
        const currentChatId = match ? match.params.chatId : null
        if (currentChatId !== action.payload.chatId) {
            store.dispatch(setOnFire(action.payload.chatId, true))
        }
    }

    if (action.type === '@@router/LOCATION_CHANGE') {
        let pathname= action.payload.location.pathname
        if(pathname.includes('/chats/') && !action.payload.isFirstRendering ) {
            store.dispatch(setOnFire(pathname.replace('/chats/', ''), false))
        }
    }

    return next(action)
}
