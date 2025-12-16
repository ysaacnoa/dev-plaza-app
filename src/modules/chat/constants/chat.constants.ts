export type Message = {
  id: string;
  text: string;
  variant: 'me' | 'reminder';
};


export const DEFAULT_MESSAGES: Message[] = [
  { id: '1', text: 'Mi conversación', variant: 'me' },
  { id: '2', text: 'Mi conversación', variant: 'me' },
  { id: '3', text: 'Mi conversación', variant: 'me' },
  { id: '4', text: 'Respuesta del chatbot', variant: 'reminder' },
  { id: '5', text: 'Mi conversación', variant: 'me' },
];
