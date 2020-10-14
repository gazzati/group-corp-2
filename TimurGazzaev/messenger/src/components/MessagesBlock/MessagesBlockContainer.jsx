import React from 'react'
import {connect} from 'react-redux'
import {nanoid} from 'nanoid'
import {deleteMessage, sendMessage} from '../../actions/chats'
import {MessagesBlock} from "./MessagesBlock"
import {createMatchSelector} from "connected-react-router";

const MessagesBlockContainer = ({chatId, messages, sendMessage, isDrawerOpen, deleteMessage, isLoading}) =>  {

    const addMessage = (message) => {
        message.id = nanoid()
        let tmpId = + chatId
        sendMessage({...message, chatId: tmpId})
    }

    const handleDeleteMessage = (messageId) => {
        deleteMessage(chatId, messageId)
    }

    return <MessagesBlock messages={messages}
                          addMessage={addMessage}
                          open={isDrawerOpen}
                          handleDeleteMessage={handleDeleteMessage}
                          isLoading={isLoading}
    />
}

function mapStateToProps(state){
    const chats = state.chats.entries
    const matchSelector = createMatchSelector("/chats/:chatId")
    const match = matchSelector(state)
    const chatId = match ? match.params.chatId : null

    let messages = null
    let chatsTmp = chats.filter(chat => chat.id.toString() === chatId)[0]
    if(chatId && chatsTmp){
        messages = chatsTmp.messages
    }

    return {
        messages,
        chatId,
        isDrawerOpen: state.settings.isDrawerOpen,
        isLoading: state.chats.loading
    }
}

export default connect(mapStateToProps, {sendMessage, deleteMessage})(MessagesBlockContainer)
