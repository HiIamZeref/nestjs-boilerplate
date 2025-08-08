import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpClientService {
  constructor(private readonly http: HttpService) {}

  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await firstValueFrom(this.http.get<T>(url, config));
    return response.data;
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await firstValueFrom(this.http.post<T>(url, data, config));
    return response.data;
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await firstValueFrom(this.http.put<T>(url, data, config));
    return response.data;
  }

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await firstValueFrom(
      this.http.patch<T>(url, data, config),
    );
    return response.data;
  }

  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await firstValueFrom(this.http.delete<T>(url, config));
    return response.data;
  }
}
