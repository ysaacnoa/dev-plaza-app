export interface Movement {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
}
 
export const MOCK_TRANSACTIONS: Movement[] = [
 
  { id: '1', description: 'Salario Noviembre', amount: 3500.00, date: '2025-11-27', type: 'income', category: 'Salario' },
  { id: '2', description: 'Supermercado Wong', amount: 245.50, date: '2025-11-26', type: 'expense', category: 'Alimentación' },
  { id: '3', description: 'Netflix', amount: 44.90, date: '2025-11-25', type: 'expense', category: 'Entretenimiento' },
  { id: '4', description: 'Uber', amount: 18.50, date: '2025-11-25', type: 'expense', category: 'Transporte' },
  { id: '5', description: 'Farmacia', amount: 67.80, date: '2025-11-24', type: 'expense', category: 'Salud' },
  { id: '6', description: 'Transferencia recibida', amount: 500.00, date: '2025-11-23', type: 'income', category: 'Transferencias' },
  { id: '7', description: 'Restaurante', amount: 125.00, date: '2025-11-22', type: 'expense', category: 'Alimentación' },
  { id: '8', description: 'Gasolina Primax', amount: 180.00, date: '2025-11-21', type: 'expense', category: 'Transporte' },
  { id: '9', description: 'Amazon Prime', amount: 35.00, date: '2025-11-20', type: 'expense', category: 'Entretenimiento' },
  { id: '10', description: 'Gimnasio', amount: 150.00, date: '2025-11-20', type: 'expense', category: 'Deporte' },
  
 
  { id: '11', description: 'Pago de luz', amount: 89.50, date: '2025-11-19', type: 'expense', category: 'Servicios' },
  { id: '12', description: 'Pago de agua', amount: 45.30, date: '2025-11-19', type: 'expense', category: 'Servicios' },
  { id: '13', description: 'Supermercado Metro', amount: 198.75, date: '2025-11-18', type: 'expense', category: 'Alimentación' },
  { id: '14', description: 'Spotify', amount: 19.90, date: '2025-11-17', type: 'expense', category: 'Entretenimiento' },
  { id: '15', description: 'Delivery Rappi', amount: 45.00, date: '2025-11-16', type: 'expense', category: 'Alimentación' },
  { id: '16', description: 'Cine', amount: 38.00, date: '2025-11-15', type: 'expense', category: 'Entretenimiento' },
  { id: '17', description: 'Farmacia InkaFarma', amount: 87.90, date: '2025-11-14', type: 'expense', category: 'Salud' },
  { id: '18', description: 'Uber', amount: 25.50, date: '2025-11-13', type: 'expense', category: 'Transporte' },
  { id: '19', description: 'Transferencia enviada', amount: 300.00, date: '2025-11-12', type: 'expense', category: 'Transferencias' },
  { id: '20', description: 'Starbucks', amount: 24.50, date: '2025-11-11', type: 'expense', category: 'Alimentación' },
  
  { id: '21', description: 'Salario extra', amount: 1000.00, date: '2025-11-10', type: 'income', category: 'Otros ingresos' },
  { id: '22', description: 'Librería', amount: 75.00, date: '2025-11-09', type: 'expense', category: 'Educación' },
  { id: '23', description: 'Taxi', amount: 15.00, date: '2025-11-08', type: 'expense', category: 'Transporte' },
  { id: '24', description: 'Supermercado Plaza Vea', amount: 210.30, date: '2025-11-07', type: 'expense', category: 'Alimentación' },
  { id: '25', description: 'Steam Games', amount: 59.99, date: '2025-11-06', type: 'expense', category: 'Entretenimiento' },
  { id: '26', description: 'Peluquería', amount: 35.00, date: '2025-11-05', type: 'expense', category: 'Cuidado personal' },
  { id: '27', description: 'Pago internet', amount: 120.00, date: '2025-11-04', type: 'expense', category: 'Servicios' },
  { id: '28', description: 'Doctor', amount: 150.00, date: '2025-11-03', type: 'expense', category: 'Salud' },
  { id: '29', description: 'Gasolina', amount: 170.00, date: '2025-11-02', type: 'expense', category: 'Transporte' },
  { id: '30', description: 'Salario Octubre', amount: 3500.00, date: '2025-11-01', type: 'income', category: 'Salario' },
  
 
  { id: '31', description: 'Restaurante Chifa', amount: 95.00, date: '2025-10-31', type: 'expense', category: 'Alimentación' },
  { id: '32', description: 'Uber', amount: 22.00, date: '2025-10-30', type: 'expense', category: 'Transporte' },
  { id: '33', description: 'Supermercado Tottus', amount: 185.60, date: '2025-10-29', type: 'expense', category: 'Alimentación' },
  { id: '34', description: 'Cine 4D', amount: 55.00, date: '2025-10-28', type: 'expense', category: 'Entretenimiento' },
  { id: '35', description: 'Zara', amount: 299.90, date: '2025-10-27', type: 'expense', category: 'Ropa' },
  { id: '36', description: 'Transferencia recibida', amount: 250.00, date: '2025-10-26', type: 'income', category: 'Transferencias' },
  { id: '37', description: 'McDonald\'s', amount: 32.50, date: '2025-10-25', type: 'expense', category: 'Alimentación' },
  { id: '38', description: 'Gasolina Repsol', amount: 165.00, date: '2025-10-24', type: 'expense', category: 'Transporte' },
  { id: '39', description: 'HBO Max', amount: 34.90, date: '2025-10-23', type: 'expense', category: 'Entretenimiento' },
  { id: '40', description: 'Veterinaria', amount: 120.00, date: '2025-10-22', type: 'expense', category: 'Mascotas' },
  
  { id: '41', description: 'Supermercado Wong', amount: 225.40, date: '2025-10-21', type: 'expense', category: 'Alimentación' },
  { id: '42', description: 'Dentista', amount: 200.00, date: '2025-10-20', type: 'expense', category: 'Salud' },
  { id: '43', description: 'Pago de cable', amount: 99.00, date: '2025-10-19', type: 'expense', category: 'Servicios' },
  { id: '44', description: 'Delivery PedidosYa', amount: 52.00, date: '2025-10-18', type: 'expense', category: 'Alimentación' },
  { id: '45', description: 'Nike Store', amount: 349.90, date: '2025-10-17', type: 'expense', category: 'Ropa' },
  { id: '46', description: 'Uber', amount: 19.50, date: '2025-10-16', type: 'expense', category: 'Transporte' },
  { id: '47', description: 'Bonus trabajo', amount: 800.00, date: '2025-10-15', type: 'income', category: 'Otros ingresos' },
  { id: '48', description: 'Pizzería', amount: 78.00, date: '2025-10-14', type: 'expense', category: 'Alimentación' },
  { id: '49', description: 'Librería Crisol', amount: 125.00, date: '2025-10-13', type: 'expense', category: 'Educación' },
  { id: '50', description: 'Starbucks', amount: 28.50, date: '2025-10-12', type: 'expense', category: 'Alimentación' },
 
  { id: '51', description: 'Supermercado Metro', amount: 203.20, date: '2025-10-11', type: 'expense', category: 'Alimentación' },
  { id: '52', description: 'Gasolina', amount: 175.00, date: '2025-10-10', type: 'expense', category: 'Transporte' },
  { id: '53', description: 'Cine', amount: 42.00, date: '2025-10-09', type: 'expense', category: 'Entretenimiento' },
  { id: '54', description: 'Farmacia', amount: 95.30, date: '2025-10-08', type: 'expense', category: 'Salud' },
  { id: '55', description: 'Restaurante', amount: 135.00, date: '2025-10-07', type: 'expense', category: 'Alimentación' },
  { id: '56', description: 'Uber', amount: 23.00, date: '2025-10-06', type: 'expense', category: 'Transporte' },
  { id: '57', description: 'Pago de luz', amount: 92.80, date: '2025-10-05', type: 'expense', category: 'Servicios' },
  { id: '58', description: 'Supermercado', amount: 189.50, date: '2025-10-04', type: 'expense', category: 'Alimentación' },
  { id: '59', description: 'Gimnasio', amount: 150.00, date: '2025-10-03', type: 'expense', category: 'Deporte' },
  { id: '60', description: 'Transferencia recibida', amount: 600.00, date: '2025-10-02', type: 'income', category: 'Transferencias' },
];