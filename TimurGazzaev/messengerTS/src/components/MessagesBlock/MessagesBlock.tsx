import React from 'react'
import {MessagesList} from './MessagesList'
import {MessageForm} from './MessageForm'
import {Grid, Divider} from "@material-ui/core"
import clsx from "clsx"
import {makeStyles} from "@material-ui/core/styles"
import {MessageType} from "./Message"

export const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        marginTop: 80,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 250,
    },
    form: {
        margin: '30px auto 0',
    },
    name: {
        width: 140,
        marginRight: 20
    },
    text: {
        width: 500,
    },
    button: {
        margin: '10px 0 0 510px'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 220,
    },
    closeIcon: {
        width: 16,
        cursor: "pointer",
        marginLeft: 10
    }
}))

type MessagesBlockType = {
    messages: MessageType[];
    addMessage: (message: MessageType) => void;
    open: boolean;
    handleDeleteMessage: (messageId: string) => void;
}

export const MessagesBlock: React.FC<MessagesBlockType> = ({messages, addMessage, open, handleDeleteMessage}) => {
    const classes: any = useStyles()

    return (
        <Grid container spacing={2}>
            <Grid className={clsx(classes.content, {[classes.contentShift]: open})}>
                <Grid item xs={4} className={classes.messages}>
                    <MessagesList messages={messages} handleDeleteMessage={handleDeleteMessage} classes={classes}/>
                </Grid>
                <Divider/>
                <Grid item xs={8} className={classes.form}>
                    <MessageForm classes={classes} onSend={addMessage}/>
                </Grid>
            </Grid>
        </Grid>
    )
}
