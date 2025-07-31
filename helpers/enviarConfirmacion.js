import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const enviarConfirmacion = async (data) => {
    const { nombre, email, token } = data
    const resend = new Resend(process.env.RESEND_TOKEN);

    try {
        const { data } = await resend.emails.send({
            from: "TaskManager <zonacoderscontacto@zonacoders.com>",
            to: email,
            subject: "Confirma tu Cuenta",
            html: `
                <p>Hola ${nombre}, te hemos enviado este e-mail para que confirmes tu cuenta</p>
                <p>Sigue el siguiente enlace: <a href="${process.env.URL_FRONTEND}/confirmar-cuenta/${token}">Confirmar cuenta</a></p>
            `,
        })
        console.log(`Mensaje ${data.id} enviado`);
    } catch (error) {
        console.log(error);
    }
}

export default enviarConfirmacion;