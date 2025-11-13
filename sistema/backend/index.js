const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const porta = 3000
const app = express()
const crypto = require('crypto')

const pool = require('./db.js')

//módulo crypto

app.use(cors())
app.use(express.json())

app.listen(porta, () => {
    console.log("servidor rodando!")
})

//criando uma rota


app.post("/contato", async (req, res) => {
    try {
        const { nome_completo,email,assunto,mensagem} = req.body

        
        if (mensagem == "") {
            return res.json({"resposta":"Preencha alguma mensagem"})
        } else if (mensagem.length < 6) {
            return res.json({"resposta":"A mensagem deve conter no minimo 6 caracteres"})
        } else if (email.length < 6) {
            return res.json({"resposta":"preencha um email"})
        } else if (nome_completo.length < 6) {
            return res.json({"resposta":"Preencha um nome"})
        } else if (assunto.length < 6) {
            return res.json({"resposta":"Preencha um assunto com no minimo 6 caracteres"})
        }


        //validar informações
        let sql = `Insert into visitantes (nome_completo,email,assunto, mensagem) Values (?,?,?,?)`
        let [resultado2] = await pool.query(sql, [nome_completo, email, assunto,mensagem])

        if (resultado2.affectedRows == 1) {
            res.json({ "resposta": "Mensagem enviada com sucesso!" })
        } else {
            res.json({ "resposta": "Erro ao enviar mensagem" })
        }

    } catch (error) {
        console.log(error)
    }
})



