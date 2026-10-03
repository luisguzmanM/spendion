const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Email para confirmar la cuenta
const emailRegistro = async (data) => {
  const { email, name, token } = data;

  const frontendUrl = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'prod' ? 'https://www.spendion.app' : 'http://localhost:4200');
  const confirmationLink = `${frontendUrl}/account-confirmed?token=${token}`;

  console.log(`\n==================================================`);
  console.log(`📧 Account confirmation link for ${name} (${email}):`);
  console.log(`   ${confirmationLink}`);
  console.log(`==================================================\n`);

  // If using placeholder credentials in .env, skip attempting to send via SMTP
  const isPlaceholder = !process.env.EMAIL_USER ||
    process.env.EMAIL_USER.includes('your_email') ||
    !process.env.EMAIL_PASS ||
    process.env.EMAIL_PASS.includes('your_app_password');

  if (isPlaceholder) {
    console.log('ℹ️  Skipping SMTP send: EMAIL_USER/EMAIL_PASS are placeholders in .env.');
    return;
  }

  try { 
    const { data, error } = await resend.emails.send(
      { 
        from: 'Spendion.app <onboarding@resend.dev>', 
        to: email, 
        subject: 'Confirm your Spendion account', 
        text: `Hello, ${name}! Confirm your Spendion account here: ${confirmationLink}`, 
        html: ` <p>Hello, ${name}!</p> <p>Please confirm your Spendion account.</p> <p> Your Spendion account has been created. You just need to confirm your account by clicking the link below: </p> <p> <a href="${confirmationLink}"> Confirm account </a> </p> <p> If you did not create this account, you can ignore this email. </p> ` 
      }
    ); 
    
    if (error) { 
      console.error('⚠️ Resend error:', error); 
      return; 
    } 
    
    console.log(`✅ Confirmation email sent to ${email}`); 
    console.log(`📧 Resend email ID: ${data?.id}`); 
  } catch (error) { 
    console.error('⚠️ Could not send confirmation email:', error.message); 
  }
};

module.exports = {
  emailRegistro
};