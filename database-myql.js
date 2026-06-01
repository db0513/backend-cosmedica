import { randomUUID } from "node:crypto";
import {sql} from "./db.js";

export class databaseMYSQL {

    
async list(search) {
    let cosmeticas;

    if (search) {
   

        [cosmeticos] = await sql.execute(
            'SELECT * FROM cosmeticas WHERE title LIKE ?',
            [`%${search}%`]
        );
    } else {
        [cosmeticos] = await sql.execute('SELECT * FROM cosmeticos');
    }

    return cosmeticos;
}


    async create(cosmeticas) {
        const cosmeticosId = randomUUID();
        const { nome, description, price } = cosmeticas;


        await sql.execute(
            'INSERT INTO cosmeticas (id, title = Cosmeticos, descricao, duracao) VALUES (?, ?, ?, ?)'
            [cosmeticosId, nome, description, price]
        );
    }


    async update(id, cosmeticos) {
        const { nome, description, price } = cosmeticos;
        await sql.execute(
            'UPDATE cosmeticos SET nome = ?, description = ?, price = ? WHERE id = ?',
            [nome, description, price, id]
        );
    }


    async delete(id) {
        await sql.execute('DELETE FROM cosmeticos WHERE id = ?', [id]);
        } 
    }