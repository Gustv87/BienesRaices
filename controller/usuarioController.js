import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Iniciar Sesión'
    })
}
const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear Cuenta'
    })
}
const registrar = async (req, res) => {
    // Validacion
    await check('nombre').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Esto no parece un correo valido').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El password de ser de al menos 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('Los password no son iguales').run(req)

    let resultado = validationResult(req)

    // return res.json(resultado.array())

    // Verificar que el resultado esta vacio
    if (!resultado.isEmpty()) {
        // Errores
        return res.render('auth/registro', {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
    // Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({where : {email: req.body.email}})
    
    console.log(existeUsuario);
    
    return;

}

const formularioOlvidePassword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: 'Recupera tu Acceso'
    })
}




export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioOlvidePassword
}