import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabaseMYSQL {

    
async list(search) {
    let cosmedica;

    if (search) {
   

        [cosmedica] = await sql.execute(
            'SELECT * FROM cosmetica WHERE title LIKE ?',
            [`%${search}%`]
        );
    } else {
        [cosmedica] = await sql.execute('SELECT * FROM cosmedica');
    }

    return cosmedica;
}


    async create(cosmedica) {
        const cosmedicaId = randomUUID();
        const { nome, description, price } = cosmedica;


        await sql.execute(
            'INSERT INTO cosmedica (id, title = Cosmedica, descricao, duracao) VALUES (?, ?, ?, ?)',
            [cosmedicaId, nome, description, price]
        );
    }


    async update(id, cosmedica) {
        const { nome, description, price } = cosmedica;
        await sql.execute(
            'UPDATE cosmedica SET nome = ?, description = ?, price = ? WHERE id = ?',
            [nome, description, price, id]
        );
    }


    async delete(id) {
        await sql.execute('DELETE FROM cosmedica WHERE id = ?', [id]);
        } 
    }