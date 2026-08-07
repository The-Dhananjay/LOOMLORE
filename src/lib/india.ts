// India-only formatting helpers. Default country: India.
// Currency: Indian Rupees (Rs) in lakh/crore grouping (1,25,000).

export const RUPEE_SIGN = 'Rs';

export const DEFAULT_COUNTRY = 'India';
export const DEFAULT_CURRENCY = 'INR';
export const DEFAULT_LOCALE = 'en-IN';

export function formatINR(amount: number): string {
  const negative = amount < 0;
  const n = Math.abs(Math.round(amount));
  const s = n.toString();
  let out = '';
  if (s.length <= 3) {
    out = s;
  } else {
    out = s.slice(-3);
    let rest = s.slice(0, -3);
    while (rest.length > 2) {
      out = rest.slice(-2) + ',' + out;
      rest = rest.slice(0, -2);
    }
    out = rest + ',' + out;
  }
  return (negative ? '-' + RUPEE_SIGN : RUPEE_SIGN) + ' ' + out;
}

export function formatINRWords(amount: number): string {
  const n = amount;
  if (n >= 10000000) {
    const cr = n / 10000000;
    return RUPEE_SIGN + (Math.round(cr * 100) / 100).toFixed(2).replace(/\.?0+$/, '') + ' crore';
  }
  if (n >= 100000) {
    const lakh = n / 100000;
    return RUPEE_SIGN + (Math.round(lakh * 100) / 100).toFixed(2).replace(/\.?0+$/, '') + ' lakh';
  }
  if (n >= 1000) {
    const k = n / 1000;
    return RUPEE_SIGN + (Math.round(k * 100) / 100).toFixed(2).replace(/\.?0+$/, '') + ' thousand';
  }
  return formatINR(n);
}

export function formatDateDDMMYYYY(d: Date = new Date()): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return dd + '/' + mm + '/' + yyyy;
}

export function formatTime12h(d: Date = new Date()): string {
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return h + ':' + m + ' ' + ampm;
}

export const APPAREL_GST_PCT = 5;
export const PREMIUM_GST_PCT = 12;

export function splitGST(amountInclusive: number, gstPct: number) {
  const base = Math.round((amountInclusive * 100) / (100 + gstPct));
  const gst = amountInclusive - base;
  return { base, gst };
}

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export const INDIAN_PAYMENTS = [
  { id: 'upi', label: 'UPI (any app)' },
  { id: 'phonepe', label: 'PhonePe' },
  { id: 'gpay', label: 'Google Pay' },
  { id: 'paytm', label: 'Paytm' },
  { id: 'bhim', label: 'BHIM' },
  { id: 'netbanking', label: 'Net Banking (100+ banks)' },
  { id: 'card', label: 'Debit / Credit Card' },
  { id: 'emi', label: 'EMI on cards' },
  { id: 'cod', label: 'Cash on Delivery' }
] as const;

export function isValidPIN(pin: string) {
  return /^[1-9][0-9]{5}$/.test(pin.trim());
}

export function deliveryEtaDays(state: string): { min: number; max: number } {
  const metros = ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'West Bengal', 'Gujarat'];
  if (metros.includes(state)) return { min: 2, max: 4 };
  return { min: 4, max: 7 };
}

export const INDIAN_FESTIVALS: { id: string; name: string; date: string; tagline: string }[] = [
  { id: 'diwali', name: 'Diwali', date: '01/11/2026', tagline: 'New drape for the festival of lights.' },
  { id: 'holi', name: 'Holi', date: '04/03/2026', tagline: 'Colours that survive the wash.' },
  { id: 'eid', name: 'Eid', date: '20/03/2026', tagline: 'Hand-embroidered finery for Eid celebrations.' },
  { id: 'navratri', name: 'Navratri', date: '11/10/2026', tagline: 'Nine nights, nine colours of chaniya choli.' },
  { id: 'rakhi', name: 'Raksha Bandhan', date: '28/08/2026', tagline: 'Gift your sister a handwoven memory.' },
  { id: 'onam', name: 'Onam', date: '26/08/2026', tagline: 'Kerala kasavu for Onam sadhya.' },
  { id: 'pongal', name: 'Pongal', date: '14/01/2027', tagline: 'Fresh silk for the harvest festival.' },
  { id: 'republic', name: 'Independence Day', date: '15/08/2026', tagline: 'Wear the tricolour - khadi, cotton, silk.' }
];
