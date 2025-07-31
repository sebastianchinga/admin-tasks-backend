import { Resend } from "resend";
import dotenv from 'dotenv';

dotenv.config();

const recuperarCuenta = async (data) => {
    const { nombre, email, token } = data
    const resend = new Resend(process.env.RESEND_TOKEN);

    try {
        const { data } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: email,
            subject: "Recupera tu Cuenta",
            html: `
                <p>Hola ${nombre}, te hemos enviado este e-mail para que recuperes tu cuenta</p>
                <p>Sigue el siguiente enlace: <a href="${process.env.URL_FRONTEND}/olvide-password/${token}">Recuperar cuenta</a></p>
            `,
        })
        console.log(`Mensaje ${data.id} enviado`);
    } catch (error) {
        console.log(error);
    }
}

export default recuperarCuenta