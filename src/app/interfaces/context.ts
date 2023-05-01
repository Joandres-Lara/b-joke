import Message from "@app/Messages/Message"
import type BotInteractionUserSesion from "@app/bot-interaction-user-sesion/bot-interaction-user-sesion"

export interface Context {
 request(question: string, session: BotInteractionUserSesion): Promise<Message>
}