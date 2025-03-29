import { ticketModel } from "../models/ticket.model.js";

class TicketDaoMongo {
    constructor() {
        this.model = ticketModel;
    }


    create = async (newTicket) => {
        try {
            const createdTicket = await this.model.create(newTicket);
            return createdTicket;
        } catch (error) {
            console.error("Error al crear el ticket:", error);
            throw error;
        }
    };


    getById = async (id) => {
        try {
            const ticket = await this.model.findById(id);
            return ticket;
        } catch (error) {
            console.error("Error al obtener el ticket:", error);
            throw error;
        }
    };


    getAll = async () => {
        try {
            const tickets = await this.model.find();
            return tickets;
        } catch (error) {
            console.error("Error al obtener todos los tickets:", error);
            throw error;
        }
    };
}

export const TicketDao = new TicketDaoMongo();