export interface SubCategory {
  id: string;
  name: string;
}

export interface BusinessCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: SubCategory[];
}

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: 'operational',
    name: 'Gastos Operativos',
    icon: '🏢',
    subcategories: [
      { id: 'rent', name: 'Alquiler de Local' },
      { id: 'utilities', name: 'Servicios Básicos' },
      { id: 'maintenance', name: 'Mantenimiento' },
      { id: 'supplies', name: 'Suministros de Oficina' },
      { id: 'cleaning', name: 'Limpieza y Sanitización' }
    ]
  },
  {
    id: 'personnel',
    name: 'Personal y RRHH',
    icon: '👥',
    subcategories: [
      { id: 'salaries', name: 'Sueldos y Salarios' },
      { id: 'benefits', name: 'Beneficios Sociales' },
      { id: 'training', name: 'Capacitación' },
      { id: 'recruitment', name: 'Reclutamiento' },
      { id: 'contractors', name: 'Contratistas' }
    ]
  },
  {
    id: 'technology',
    name: 'Tecnología',
    icon: '💻',
    subcategories: [
      { id: 'software', name: 'Software y Licencias' },
      { id: 'hardware', name: 'Equipos y Hardware' },
      { id: 'hosting', name: 'Hosting y Dominios' },
      { id: 'telecom', name: 'Telecomunicaciones' },
      { id: 'cybersecurity', name: 'Seguridad Digital' }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing y Ventas',
    icon: '📢',
    subcategories: [
      { id: 'advertising', name: 'Publicidad' },
      { id: 'events', name: 'Eventos y Ferias' },
      { id: 'branding', name: 'Branding y Diseño' },
      { id: 'social_media', name: 'Redes Sociales' },
      { id: 'crm', name: 'CRM y Herramientas de Ventas' }
    ]
  },
  {
    id: 'financial',
    name: 'Gastos Financieros',
    icon: '💰',
    subcategories: [
      { id: 'bank_fees', name: 'Comisiones Bancarias' },
      { id: 'loan_payments', name: 'Pago de Préstamos' },
      { id: 'insurance', name: 'Seguros' },
      { id: 'accounting', name: 'Servicios Contables' },
      { id: 'taxes', name: 'Impuestos y Tributos' }
    ]
  },
  {
    id: 'logistics',
    name: 'Logística y Transporte',
    icon: '🚚',
    subcategories: [
      { id: 'shipping', name: 'Envíos y Mensajería' },
      { id: 'storage', name: 'Almacenamiento' },
      { id: 'fuel', name: 'Combustible' },
      { id: 'vehicle_maintenance', name: 'Mantenimiento de Vehículos' },
      { id: 'delivery', name: 'Servicios de Entrega' }
    ]
  },
  {
    id: 'inventory',
    name: 'Inventario y Materiales',
    icon: '📦',
    subcategories: [
      { id: 'raw_materials', name: 'Materias Primas' },
      { id: 'packaging', name: 'Empaques y Embalajes' },
      { id: 'merchandise', name: 'Mercancía para Reventa' },
      { id: 'tools', name: 'Herramientas y Equipos' },
      { id: 'inventory_software', name: 'Software de Inventario' }
    ]
  },
  {
    id: 'professional',
    name: 'Servicios Profesionales',
    icon: '👔',
    subcategories: [
      { id: 'legal', name: 'Servicios Legales' },
      { id: 'consulting', name: 'Consultoría' },
      { id: 'it_services', name: 'Servicios de TI' },
      { id: 'design', name: 'Diseño y Creatividad' },
      { id: 'research', name: 'Investigación de Mercado' }
    ]
  },
  {
    id: 'administrative',
    name: 'Gastos Administrativos',
    icon: '📋',
    subcategories: [
      { id: 'office_supplies', name: 'Papelería y Útiles' },
      { id: 'subscriptions', name: 'Suscripciones' },
      { id: 'certifications', name: 'Certificaciones' },
      { id: 'permits', name: 'Permisos y Licencias' },
      { id: 'memberships', name: 'Membresías' }
    ]
  },
  {
    id: 'development',
    name: 'Desarrollo de Negocio',
    icon: '📈',
    subcategories: [
      { id: 'rd', name: 'Investigación y Desarrollo' },
      { id: 'expansion', name: 'Expansión' },
      { id: 'equipment', name: 'Equipamiento' },
      { id: 'franchising', name: 'Franquicias' },
      { id: 'patents', name: 'Patentes y Propiedad Intelectual' }
    ]
  }
];

export const INCOME_CATEGORIES: BusinessCategory[] = [
  {
    id: 'sales',
    name: 'Ventas',
    icon: '💵',
    subcategories: [
      { id: 'products', name: 'Productos' },
      { id: 'services', name: 'Servicios' },
      { id: 'subscriptions', name: 'Suscripciones' },
      { id: 'contracts', name: 'Contratos' },
      { id: 'commissions', name: 'Comisiones' }
    ]
  },
  {
    id: 'investments',
    name: 'Inversiones',
    icon: '📊',
    subcategories: [
      { id: 'interest', name: 'Intereses' },
      { id: 'dividends', name: 'Dividendos' },
      { id: 'real_estate', name: 'Bienes Raíces' },
      { id: 'stocks', name: 'Acciones' },
      { id: 'crypto', name: 'Criptomonedas' }
    ]
  },
  {
    id: 'other_income',
    name: 'Otros Ingresos',
    icon: '🎯',
    subcategories: [
      { id: 'rentals', name: 'Alquileres' },
      { id: 'royalties', name: 'Regalías' },
      { id: 'grants', name: 'Subvenciones' },
      { id: 'consulting', name: 'Consultoría' },
      { id: 'miscellaneous', name: 'Varios' }
    ]
  }
];