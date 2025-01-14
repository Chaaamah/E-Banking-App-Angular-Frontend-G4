import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userInput: string = '';
  messages: { text: string, isUser: boolean }[] = [];
  isLoading: any;

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.userInput.trim() === '') return;

    // Ajoutez le message de l'utilisateur à l'interface
    this.messages.push({ text: `Vous: ${this.userInput}`, isUser: true });

    // Envoyez la requête au backend Spring
    this.http.post('/chatbot/query', { message: this.userInput }, { responseType: 'text' })
      .subscribe((response: string) => {
        // Ajoutez la réponse de Gemini à l'interface
        this.messages.push({ text: `Chatbot: ${response}`, isUser: false });
        this.userInput = ''; // Réinitialisez l'input
      }, (error) => {
        console.error('Erreur lors de la communication avec le chatbot:', error);
        this.messages.push({ text: `Chatbot: Une erreur s'est produite.`, isUser: false });
      });
  }
}
