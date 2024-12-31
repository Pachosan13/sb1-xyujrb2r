export interface Country {
  code: string;
  name: string;
  currency: {
    code: string;
    symbol: string;
  };
}

export const LATAM_COUNTRIES: Country[] = [
  { code: 'AR', name: 'Argentina', currency: { code: 'ARS', symbol: '$' } },
  { code: 'BO', name: 'Bolivia', currency: { code: 'BOB', symbol: 'Bs.' } },
  { code: 'BR', name: 'Brasil', currency: { code: 'BRL', symbol: 'R$' } },
  { code: 'CL', name: 'Chile', currency: { code: 'CLP', symbol: '$' } },
  { code: 'CO', name: 'Colombia', currency: { code: 'COP', symbol: '$' } },
  { code: 'CR', name: 'Costa Rica', currency: { code: 'CRC', symbol: '₡' } },
  { code: 'EC', name: 'Ecuador', currency: { code: 'USD', symbol: '$' } },
  { code: 'SV', name: 'El Salvador', currency: { code: 'USD', symbol: '$' } },
  { code: 'GT', name: 'Guatemala', currency: { code: 'GTQ', symbol: 'Q' } },
  { code: 'HN', name: 'Honduras', currency: { code: 'HNL', symbol: 'L' } },
  { code: 'MX', name: 'México', currency: { code: 'MXN', symbol: '$' } },
  { code: 'NI', name: 'Nicaragua', currency: { code: 'NIO', symbol: 'C$' } },
  { code: 'PA', name: 'Panamá', currency: { code: 'USD', symbol: '$' } },
  { code: 'PY', name: 'Paraguay', currency: { code: 'PYG', symbol: '₲' } },
  { code: 'PE', name: 'Perú', currency: { code: 'PEN', symbol: 'S/' } },
  { code: 'UY', name: 'Uruguay', currency: { code: 'UYU', symbol: '$' } },
  { code: 'VE', name: 'Venezuela', currency: { code: 'VES', symbol: 'Bs.' } },
].sort((a, b) => a.name.localeCompare(b.name));