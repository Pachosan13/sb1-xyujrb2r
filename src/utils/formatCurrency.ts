import { Country } from '../types/currency';

export function formatCurrency(amount: number, country: Country | null): string {
  if (!country) return `${amount.toFixed(2)}`;

  const formatter = new Intl.NumberFormat(getLocale(country.code), {
    style: 'currency',
    currency: country.currency.code,
    currencyDisplay: 'symbol'
  });

  return formatter.format(amount);
}

function getLocale(countryCode: string): string {
  const localeMap: { [key: string]: string } = {
    'AR': 'es-AR',
    'BO': 'es-BO',
    'BR': 'pt-BR',
    'CL': 'es-CL',
    'CO': 'es-CO',
    'CR': 'es-CR',
    'EC': 'es-EC',
    'SV': 'es-SV',
    'GT': 'es-GT',
    'HN': 'es-HN',
    'MX': 'es-MX',
    'NI': 'es-NI',
    'PA': 'es-PA',
    'PY': 'es-PY',
    'PE': 'es-PE',
    'UY': 'es-UY',
    'VE': 'es-VE'
  };
  return localeMap[countryCode] || 'es';
}