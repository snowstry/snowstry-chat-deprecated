import Pusher from "pusher";

export const pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.pusherSecret,
    cluster: process.env.cluster,
    useTLS: true
});

export default async function handler(req, res) {
    const message = req.body.message;
    const sender = req.body.username.user
    const response = await pusher.trigger("chat", "chat-event", {
        message,
        sender,
    });

    res.json({ message: "completed" });
}