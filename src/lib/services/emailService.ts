type Email = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
};

export default class EmailService {
  private sender: any;

  constructor(sender: any) {
    this.sender = sender;
  }

  public async sendMail(mail: Email): Promise<void> {
    return await this.sender.send(mail);
  }
}
