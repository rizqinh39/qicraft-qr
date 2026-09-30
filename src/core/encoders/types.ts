export interface IPayloadEncoder<T> {
  readonly type: string;
  encode(payload: T): string;
  validate(payload: T): { isValid: boolean; error?: string };
}

export interface IUrlPayload {
  baseUrl: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface IWifiPayload {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

export interface IVCardPayload {
  firstName: string;
  lastName?: string;
  organization?: string;
  jobTitle?: string;
  phone?: string;
  workPhone?: string;
  email?: string;
  website?: string;
  address?: string;
}

export interface ISmsPayload {
  phone: string;
  message?: string;
}
