import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS

    }

});


export const sendRecoveryEmail = async (email,link)=>{

    await transporter.sendMail({

        from: "Ecommerce Backend",

        to: email,

        subject: "Password Recovery",

        html: `
            <h2>Recuperación de contraseña</h2>

            <p>Haz click en el siguiente botón para restablecer tu contraseña</p>

            <a href="${link}">
                <button>Restablecer contraseña</button>
            </a>

            <p>Este enlace expira en 1 hora</p>
        `

    });

}

