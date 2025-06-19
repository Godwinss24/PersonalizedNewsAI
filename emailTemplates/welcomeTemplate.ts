const welcomeTemplate = (userEmail: string) => {
  return `
      <h1>Welcome to Personalized News AI</h1>
      <p>Hello ${userEmail},</p>
      <p>Thanks for testing our mailing service. This is a sample email sent via Nodemailer.</p>
    `;
};

export default welcomeTemplate;
