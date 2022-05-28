import * as dotenv from 'dotenv';
dotenv.config();

const EmailBuilder = {
  confirmRegisterEmail: (verification_code) => `
    <html>this is confirm register email. Verifiy your email by clicking this <a href="${process.env.APP_URL}/signin?email_verify=${verification_code}">link</a><br/></html>
  `,
  forgetPasswordEmail: (forgetpassword_code) => `
  <html>this is email to reset password. Reset password by clicking this <a href="${process.env.APP_URL}/reset_password/${forgetpassword_code}">link</a><br/></html>
  `,
  messageEmail: async (link, content, qrImagePath) => {
    return `
      <html>
        <div>
          ${content}
        </div>
        <div style="text-align: center">
          <img src="${qrImagePath}" style="width: 300px"/>
        </div>
        <div>
          Click this <a href="${link}">link</a>.
        </div>
      </html>
    `;
  },
  registerMail: async (body) => {
    return `
    <html lang="en">
    <style>
        .form-group{
            display: block;
            float: left;
            width: 100%;
        }
    </style>
    <body>
        <div class="  text-center">
            <div class="reg-form">
                <div class="form-group">
                    Name:   ${body.name}
                </div>
                <div class="form-group">
                    SurName:  ${body.surName}
                </div>
                <div class="form-group">
                    Email:  ${body.email}
                </div>
                <div class="form-group">
                    Company:  ${body.organization}
                </div>
                <div class="form-group">
                    Business:  ${""}
                </div>
                <div class="form-group">
                    Country: ${""}
                </div>
                <div class="form-group">
                    Note:    ${body.message}
                </div>
                <div class="form-group">
                    Form Type:  ${""}
                </div>
            </div>             
        </div>
    </body>
</html>
    `;
  },
};

export default EmailBuilder;
