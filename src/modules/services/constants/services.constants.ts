import { IconName } from "@shared/components";

export interface ServiceItemGroup {
  category: string;
  data: ServiceItem[];
}

export interface ServiceItem{

    id: string;
    title: string;
    icon: IconName;
  
}

export const SERVICES_DATA: ServiceItemGroup[] = [
  {
    category: "Atención al Cliente",
    data: [
      { id: "1", title: "Reclamos y Quejas", icon: "alert-circle-outline" },
      { id: "2", title: "Soporte Técnico", icon: "headset-outline" },
      { id: "3", title: "Consultas Generales", icon: "help-circle-outline" },
    ],
  },
  {
    category: "Pagos y Facturación",
    data: [
      { id: "4", title: "Pagar Factura", icon: "card-outline" },
      { id: "5", title: "Historial de Pagos", icon: "receipt-outline" },
      { id: "6", title: "Planes y Tarifas", icon: "pricetag-outline" },
    ],
  },
  {
    category: "Servicios Técnicos",
    data: [
      { id: "7", title: "Instalación Nueva", icon: "home-outline" },
      { id: "8", title: "Reparación de Equipo", icon: "thermometer-outline" },
      { id: "9", title: "Cambio de Dirección", icon: "location-outline" },
      { id: "10", title: "Upgrade de Velocidad", icon: "speedometer-outline" },
    ],
  },
  {
    category: "Otros",
    data: [
      { id: "11", title: "Contratar Servicio Adicional", icon: "add-circle-outline" },
      { id: "12", title: "Baja Temporal", icon: "pause-circle-outline" },
      { id: "13", title: "Cancelar Servicio", icon: "close-circle-outline" },
    ],
  },
];