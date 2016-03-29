package com.wildfly.websockets.example;

import java.io.IOException;
import java.util.Set;
import java.util.logging.Logger;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.commons.lang3.StringUtils;

@ServerEndpoint("/broadcast")
public class BroadcastWebSocketServerEndpoint {

    private final Logger logger = Logger.getLogger(this.getClass().getName());

    @OnOpen
    public void onConnectionOpen(Session session) {
        logger.info("Connection opened ... " + session.getId());
    }

    @OnMessage
    public String onMessage(String message, Session session) {
        if (StringUtils.isBlank(message)) {
            return "Local: Please provide message";
        }

        Set<Session> allSessions = session.getOpenSessions();
        allSessions.remove(session);

        if (allSessions.isEmpty()) {
            return "Local: Nobody is available to receive the message";
        }

        for (Session s : allSessions) {
            broadcastMessage(message, s);
        }

        return "Local: Message is sent to " + allSessions.size() + " clients";
    }

    @OnClose
    public void onConnectionClose(Session session) {
        logger.info("Connection closed .... " + session.getId());
    }

    private void broadcastMessage(String message, Session session) {
        try {
            session.getBasicRemote().sendText("Remote: " + message);
        } catch (IOException ioe) {
            logger.info("Can't send message" + ioe);
        }
    }
}
