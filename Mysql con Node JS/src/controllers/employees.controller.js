import {pool} from '../db.js'

export const getEmployees = async (req, res) => {
   try {
    const [rows] = await pool.query('SELECT * FROM personal')
    res.json(rows) 
   } catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
    })
   }
}

export const getEmployee = async (req, res) => {
 try {
    const [rows] = await pool.query('SELECT * FROM personal WHERE idcontacto = ?', [req.params.id])

    if (rows.length <= 0) return res.status(404).json({
        message: 'Employee not found'
    })
    res.json(rows[0])
 } catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
    })
 }
}

export const createEmployee = async (req, res) => {
    const {nombre, numero} =req.body
    try {
        const [rows] = await pool.query('INSERT INTO personal(nombre, numero) VALUES (?, ?)', [nombre, numero])
        res.send({
            id: rows.insertId,
            nombre,
            numero,
        })   
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { nombre, numero } = req.body

   try {
    const [result] = await pool.query('UPDATE personal SET nombre = IFNULL(?, nombre), numero = IFNULL(?, numero) WHERE idcontacto = ?', [nombre, numero, id]) 

    console.log(result)

    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Employee not found'
    })

    const [rows] = await pool.query('SELECT * FROM personal WHERE idcontacto = ?', [id])
    res.json(rows[0])
   } catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
    })
   }
}

export const deleteEmployee = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM personal WHERE idcontacto = ?', [req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Employee not found'
    })

    res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}